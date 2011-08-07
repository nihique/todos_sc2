// Application

var Todos = SC.Application.create();



// Models

Todos.Todo = SC.Object.extend({
    title: null,
    isDone: false
});



// Fixtures

Todos.Todo.FIXTURES = [
    {   guid: 1,
        title: "Build my first Sproutcore app",
        isDone: false
    },
    {   guid: 2,
        title: "Build a really awesome Sproutcore app",
        isDone: false
    },
    {   guid: 3,
        title: "Start using VIM",
        isDone: true
    },
    {   guid: 4,
        title: "Next, the world!",
        isDone: false
    }
];



// Views

Todos.CreateTodoView = SC.TextField.extend({
    insertNewline: function() {
        var value = this.get('value');
        if (value) {
            Todos.todosController.createTodo(value);
            this.set('value', '');
        }
    }
});

Todos.StatsView = SC.View.extend({
    remainingBinding: 'Todos.todosController.remaining',

    remainingString: function() {
        var remaining = this.get('remaining');
        var text = remaining > 1 ? ' items' : ' item';
        return remaining + text;
    }.property('remaining')
});



// Controllers

Todos.todosController = SC.ArrayProxy.create({
    content: Todos.Todo.FIXTURES,

    remaining: function() {
        return this.filterProperty('isDone', false).get('length');
    }.property('@each.isDone'),

    areAllDone: function(key, value) {
        if (value !== undefined) {
            this.setEach('isDone', value);
            return value;
        }
        else {
            return this.get('length') && this.everyProperty('isDone', true);
        }
    }.property('@each.isDone'),

    createTodo: function(title) {
        var todo = Todos.Todo.create({ title: title });
        this.pushObject(todo);
    },

    clearCompletedTodos: function () {
        this.filterProperty('isDone', true).forEach(this.removeObject, this);
    }
});


