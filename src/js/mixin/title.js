import title from 'core/title';

function titleMixin(index) {
  return {
    title(value) {
      title.set(index, value);
    },

    componentWillUnmount() {
      title.set(index, undefined);
    }
  };
}

export default titleMixin;
