
## Writing style guidelines

When submitting content for addition to the Babelfish guide or commenting your code, please consider the following guidelines:

The documentation should be informal, but not chatty.  Our goal is to produce concise, technically accurate content that helps the reader accomplish a task.  It should not include future plans, what we were/are thinking during feature planning, or our reasoning behind implementation decisions. We keep that kind of information in the product roadmap.

Write in active voice, with the assumption that the reader is the person that will perform actions: “You should specify the password associated with...” or instructional:  “Specify the password associated with...”.  Focus on the user’s task, and the steps required to accomplish it.  Be sure to provide supporting links to helpful pages or projects.

When referring to proprietary products, use the complete company name and the product name once at the start of the page; thereafter, use only the product name. When applicable, you can refer to the syntax or protocol:

  * The term Microsoft SQL Server is the complete company name and product name.  For example: Babelfish extends your PostgreSQL database with the ability to accept database connections from Microsoft SQL Server clients.
  * The term SQL Server refers to the database, the database content, and transactions/procedures/functions that involve more than SQL syntax.  For example: Port 1433 accepts SQL Server commands, with the limitations discussed later in this guide.
  * Use T-SQL when referring to syntax or language.  For example: You should use correct T-SQL syntax when forming commands.
  * Use TDS when referring to the protocol used by SQL Server.  For example: The server listens on port 1466 for client connections in TDS protocol.

To make the documentation easier to read and understand:

  * Use short but complete sentences.  
  * Be consistent with punctuation.
  * Use bulleted lists and tables where appropriate.

Avoid using:

  * Jargon or Slang - whether marketing, developer, or internal terms
  * Colloquialisms 
  * Questions
  * Latin (vs., e.g., i.e., etc.)

The Babelfish project supports an environment of diversity and equity.  In the interest of promoting inclusivity, the following words (unless used in a literal/strictly technical manner such as an object name or command) should be avoided.  Alternatives are recommended below.  Instead of: 

  * execute → use start or run 
  * abort → use stop
  * enable → use turn on, activate, start
  * disable → use turn off, deactivate, stop
  * kill → use end or stop
  * blacklist → use deny list
  * master → use primary, main, or leader
  * hang → use stop responding
  * slave → use secondary, replica, or standby
  * black day → use blocked day
  * invalid → use not valid
  * segregate → use isolate or separate
  * it is recommended --> use we recommend

Use contractions where appropriate:  we’re, isn’t, can’t, and so on.


