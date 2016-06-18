#my-deploy

![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000?style=plastic)
![node](https://img.shields.io/badge/node-4.x-blue.svg)
![downloads](https://img.shields.io/badge/downloads-1K%2Fmonth-brightgreen.svg)
[![Build Status](https://travis-ci.org/kelvv/my-deploy.svg?branch=master)](https://travis-ci.org/kelvv/my-deploy)


It is a **tool** for use during development or production of a node.js based application whitch power by git.

The only work you need to do is to Prepare the my-deploy configuration file for your project.

my-deploy used git to check or update your project file , so your project must under git .

my-deploy support two mode:
* **pullwatch**   :   Repeate fetch and check in a fixed time
* **webhook**   :   watching http request and check if need update the project

operator system support:    **window , mac ox , linux**

version control support:    **github , bitbucket , gitcafe  ... ... ...**

Let play!

[](https://pl9wba.dm2304.livefilestore.com/y3pnXMvY1MEQufT8o5aHHjKrheiXkf6t9xNo_1EMUpYk5cjUwKMKJywmsVD6-vjjMCRzym8NVx1sA0zRinhosKA162FCqv7ERaGBMNTzGCUKSwXTp458AH5JOmcIlhb_jhLgwI2QHtLlCXHkx5-UI1QiPzjNhpLjInybvyOE_L3oTQ/mydeploy.gif?psid=1)


#Installation

using [npm](http://npmjs.org/) (the recommended way):

```
$ npm install -g my-deploy
```

And my-deploy will be installed globally to your system path.

#Usage



1. First of all , you need to check your envirment

       ```
$ git --version
git version 2.7.4 (Apple Git-66)
```

2. Create mydeploy config file

       ```
$ cd /path/of/the/config/file/you/want/to/locate
$ mydeploy init
```

3. Setup the config file what you need 

       ```
$ vi .mydeploy.json
---pullwatch---
*
{
       "mode": "pullwatch",
       "url": "your url of git use http",
       "localdir": "/path/of/your/local/project",
       "interval": 3000,
       "branch": "master",
       "rules": [
           {
               "type": "tag",
              "value": "[vV]\\d+"
          },
          {
              "type": "commit",
              "value": "#[\\s\\S]*?deploy\\s*[\\s\\S]*?77"
          }
      ]
  }
---webhook---
*
{
       "mode": "webhook",
       "url": "your project url of git use http",
       "localdir": "/path/of/your/local/project",
       "branch": "master",
       "port":"3100"
       "rules": [
           {
               "type": "tag",
              "value": "[vV]\\d+"
          },
          {
              "type": "commit",
              "value": "#[\\s\\S]*?deploy\\s*[\\s\\S]*?77"
          }
      ]
  }
```

3. Start  

       ```
$ mydeploy start
or
$ mydeploy start -c 'path/to/config/file'
```

now , your project file will update automatically
#enjoy!

## License

  MIT
