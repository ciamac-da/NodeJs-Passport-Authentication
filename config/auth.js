module.exports={
   ensureAuthenticated: function(req, res, next){
         if(req.isAuthenticated()){
               return next();
         }
         req.flash('error_msg', 'Bitte melden Sie sich an, um diese Ressource anzuzeigen!');
         res.redirect('/users/login');
   }   
}