# SolarSystem
[![Build Status](https://travis-ci.org/publicarray/solarsystem.svg?branch=gh-pages)](https://travis-ci.org/publicarray/solarsystem)

This project is hosted at [github.com/publicarray/solarsystem](https://github.com/publicarray/solarsystem). A live version is available at [publicarray.github.io/solarsystem](https://publicarray.github.io/solarsystem/).

Note: a modern browser with WebGl is required: http://caniuse.com/#feat=webgl

## Install
### Requirements
[https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll](https://help.github.com/articles/using-jekyll-with-pages/#installing-jekyll)

[Ruby](https://www.ruby-lang.org/), [Ruby Gems](https://rubygems.org) and [bundler](http://bundler.io)

```
gem install bundler
```

### Install dependencies and serve

```
git clone --recursive https://github.com/publicarray/solarsystem.git
cd solarsystem
bundle
bundle exec jekyll serve --baseurl ''
```

### Update

```
git pull
git submodule update --init --recursive --remote
bundle update
```

### Tests

```
./script/cibuild
```
