var stack = [];

function renderTitle() {
  document.title = stack.reverse().join(' | ');
}

var title = {
  push(value) {
    stack.push(value);
    renderTitle();
  },

  swap(value) {
    stack[stack.length - 1] = value;
    renderTitle();
  },

  pop() {
    stack.pop();
  }
};

export default title;
