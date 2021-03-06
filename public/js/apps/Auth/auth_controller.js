define([
    "app",
    "apps/Auth/login/login_view",
    "apps/Auth/signup/signup_view"
  ],
  function(VirtualDojo, LoginView, SignupView) {

    VirtualDojo.module("AuthApp", function(AuthApp, VirtualDojo, Backbone, Marionette, $, _){
      AuthApp.Controller = {
            
        showLoginPage: function(){
          var loginView = new LoginView.view();
          VirtualDojo.regions.main.show(loginView);
        },

        showSignUpPage: function() {
          var signupView = new SignupView.view();
          VirtualDojo.regions.main.show(signupView);
        },

        authenticate: function (username, password, unauthorized ) {
          // console.log(username, password, authorized, unauthorized);
          var ajaxData = {
            username: username,
            password: password
          };

          var request = $.ajax({
            url: "/auth/login",
            type: "POST",
            // contentType: "application/json",
            data: ajaxData
          });

          request.done(function() {
            console.log("AuthCheck: on Ajax call success");
            VirtualDojo.trigger("authenticate:init");

            // VirtualDojo.Utilities.enterApplication()
          });

          request.fail(function(req, textStatus, err) {
            console.log("[AJAX] login failed", textStatus, err);
            unauthorized();
          });
        },

        signup: function(username, password, firstname, lastname, PermissionKey, email, done) {
        var ajaxData = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email, 
            PermissionKey: PermissionKey
          }

          var request = $.ajax({
            url: "/auth/signup",
            type: "POST",
            // contentType: "application/json",
            data: ajaxData
          });

          request.done(function(data) {
            console.log("[AJAX] signup done data", data);
            VirtualDojo.trigger("authenticate:init");
            // done();
          });

          // request.fail(function(req, textStatus, err) {
          //   console.log("[AJAX] signup failed", textStatus, err);
          //   unauthorized();
          // });
        },

        logout: function() {
          $.get("/auth/logout")
            .success(function() {
              console.log("logged out, reload")
              window.location.reload();
            });
        }
      }
    });

    return VirtualDojo.AuthApp.Controller;
  }
);
