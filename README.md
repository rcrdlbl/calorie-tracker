# calorie-tracker
A simple diet tracker built in rails

How to install
==============
- Clone down the repository
- Run `bundle install`
- Either deploy to server or run `rails s` or  `thin start --ssl` to start up a local server (Due to Facebook's security requirements facebook authorization will not work with `rails s`; in addition you must set up a new application through [facebook's developer console](https://developers.facebook.com/) and make a .env file in this project's root directory with the client key and client secret)
- The application should be ready to go!

##### license
This code is under the [MIT License](https://tldrlegal.com/license/mit-license)
