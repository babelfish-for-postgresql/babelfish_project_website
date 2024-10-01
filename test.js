const { CodePipeline } = require('@aws-sdk/client-codepipeline');
const { S3 } = require('@aws-sdk/client-s3');

const codepipeline = new CodePipeline();
const s3 = new S3();



/* EXCLUSION_PATHS: Use `*` for one level and ** for any number of levels.
 * Note: `DESTINATION_KEY/` will be prefixed automatically.
 */

exports.handler = async (event, context) => {
    const { DESTINATION_BUCKET, DESTINATION_KEY, DISTRIBUTION_ID, EXCLUSION_PATHS, TIMEOUT } = JSON.parse(event["CodePipeline.job"].data.actionConfiguration.configuration.UserParameters);
    console.log(`Incoming - DESTINATION_BUCKET: ${DESTINATION_BUCKET}, DESTINATION_KEY: ${DESTINATION_KEY}, DISTRIBUTION_ID: ${DISTRIBUTION_ID}, \nEXCLUSION_PATHS: ${JSON.stringify(EXCLUSION_PATHS, null, 2)}`);

    const jobId = event["CodePipeline.job"].id;

    const sendSuccess = async data => {
        console.log('Success:', data?.message || data);
        await codepipeline.putJobSuccessResult({
            jobId: jobId,
            outputVariables: data
        });

        clearTimeout(timer);

        return data?.message || data;
    };

    const sendFailure = async data => {
        console.log('Failure:', data?.message || data);
        await codepipeline.putJobFailureResult({
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(data?.message || data),
                type: 'JobFailed',
                externalExecutionId: context.invokeid
            }
        });

        throw data?.message || data;
    };

    let timer = setTimeout(async () => {
        console.info('Timeout: Took too long to die!');
        console.error('Timeout: Took too long to die!');
        await sendFailure('Timeout');
        process.exit(1);
    }, TIMEOUT || 180000);

    process.on('uncaughtException', function (err) {
        console.info('uncaughtException');
        console.error(err.message || err);
        console.error(err.stack);
        sendFailure(err).catch();
        process.exit(1);
    });
    
    const exlusionsMatcher = Array.isArray(EXCLUSION_PATHS) && EXCLUSION_PATHS.length
        ? new RegExp(`^(${
            EXCLUSION_PATHS.map(path => 
                `${DESTINATION_KEY}\/${
                    path.replace(/(^|\/)\*\*\//g, '\/(.*\/)?')
                        .replace(/(^|\/)\*\*/g, '(\/.*)?')
                        .replace(/(?<!\.)\*/g, '[^/]*')
                    
                }`
                .replace(/\/{2,}/, '\/')
                .replace(/^\/+/, '')
            ).join('|')
        })$`)
        : false;

    if (exlusionsMatcher) console.info(`Will use ${exlusionsMatcher} to exclude objects from deletion`);

    try {
        await emptyS3Directory(DESTINATION_BUCKET, DESTINATION_KEY, exlusionsMatcher);
        // Running twice just in case a folder was split across 2 requests
        await emptyS3Directory(DESTINATION_BUCKET, DESTINATION_KEY, exlusionsMatcher);
        return await sendSuccess({ message: `Predeploy completed.` });
    } catch(ex) {
        console.error(ex);
        console.info(ex.stack);
        return await sendFailure(ex);
    }
};



const emptyS3Directory = async (bucket, dir, exlusionsMatcher, continuationToken = null) => {
    const listParams = {
        Bucket: bucket,
        Prefix: dir + '/',
        ContinuationToken: continuationToken
    };

    console.info(`Calling S3.listObjectsV2 on ${bucket}/${dir}`);

    const listedObjects = await s3.listObjectsV2(listParams);
    
    if (listedObjects.Contents && listedObjects.Contents.length == 0) return;

    const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] }
    };
    
      
    listedObjects.Contents.forEach(({ Key }) => {
        if (exlusionsMatcher?.test?.(Key)) return;
        console.info(`Calling S3.deleteObjects on ${bucket}/${Key}`);
        deleteParams.Delete.Objects.push({ Key });
    });

    if (deleteParams.Delete.Objects.length === 0) return;

    console.info(`Calling S3.deleteObjects on ${bucket} for ${deleteParams.Delete.Objects.length} objects.`);

    const out = await s3.deleteObjects(deleteParams);

    console.info('Finished with S3.deleteObjects: ' + JSON.stringify(out, null, 2));
    
    if (listedObjects.IsTruncated) {
         console.log('Previous listing was truncated...');
         await emptyS3Directory(bucket, dir, exlusionsMatcher, listedObjects.NextContinuationToken);
    }
    
}