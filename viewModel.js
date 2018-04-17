var ViewModel = function() {
    this.title = ko.observable('Weather Application');
    console.log(title(), 'Test Run');
};
 
ko.applyBindings(ViewModel())