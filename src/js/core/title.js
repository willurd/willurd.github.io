var stack = [];

function renderTitle() {
  document.title = stack.reverse().join(' | ');
}

var title = {
  push(value) {
    this.stack.push(value);
    renderTitle();
  },

  swap(value) {
    stack[stack.length - 1] = value;
    renderTitle();
  },

  pop() {
    this.stack.pop();
  }
};

export default title;
