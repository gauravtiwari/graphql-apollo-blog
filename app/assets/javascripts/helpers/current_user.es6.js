const currentUser = () => {
  return {
    id: $('meta[name=current_user]').attr('id'),
    name: $('meta[name=current_user]').attr('username'),
    email: $('meta[name=current_user]').attr('email'),
    isCurrent: function(id) {
      return this.getId() === id;
    }
  };
};

module.exports = currentUser;
