"use strict";describe("myApp.version module",function(){beforeEach(module("myApp.version")),describe("app-version directive",function(){it("should print current version",function(){module(function(e){e.value("version","TEST_VER")}),inject(function(e,n){var i=e("<span app-version></span>")(n);expect(i.text()).toEqual("TEST_VER")})})})});