Todos.TodosController = Ember.ArrayController.extend({
  actions: {
    createTodo: function() {
      // Get the todo title set by the "New Todo" text field
      var title = this.get('newTitle');
      if (!title.trim()) { return; }

      // Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },
    
    clearCompleted: function() {
      /*
      this.get('model').filterBy('isCompleted',true).forEach(function(item){
        item.destroyRecord();
      })
      */
      this.get('model').filterBy('isCompleted',true).invoke('destroyRecord');
    }
  },

  itemController: "todo",

  allAreDone: function(key, value){
    console.log("allAreDone!!")
    if(value === undefined){
      return this.get('completed') == this.get('model').get('length');
    } else {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }.property('completed'),

  hasCompleted: function(){
    return this.get('completed') > 0
  }.property('completed'),

  completed: function(){
    return this.filterBy('isCompleted', true).get('length')
  }.property('@each.isCompleted'),

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),
  
  inflection: function(){
    var remaining = this.get('remaining');
    return remaining === 1 ? 'todo' : 'todos';
  }.property('remaining')
});