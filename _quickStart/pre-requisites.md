---
layout: default
title: Pre-requisites
nav_order: 11
has_children: false
permalink: /docs/quick-start/pre-requisites
---

The first that you need to have to run Babelfish is a linux environment.

In order to build and run we need the following dependencies installed in our environment.

Which are:

- Bison
- Flex
- Jacc
- Build-essentials
- Redline
- Zlib1g-dev

To install this dependencies (assuming that you are using Ubuntu) run the following command:

``` sh
apt-get install flex \
  bison \
  build-essential \
  libreadline6-dev \
  zlib1g-dev \
  --yes
```
