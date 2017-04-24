function fuzzyMatch(text, query) {
  let t = 0;
  const tlen = text.length;

  for (let q = 0, qlen = query.length; q < qlen; q++) {
    for (; t < tlen; t++) {
      if (query[q] === text[t]) {
        break;
      }
    }
  }

  return t < tlen;
}

function fuzzyFilter(list, query, mapper) {
  const queryLower = query.toLowerCase();

  return list.filter(item => {
    const key = mapper(item);

    if (_.isArray(key)) {
      return key.some(k => fuzzyMatch(k.toLowerCase(), queryLower));
    } else {
      return fuzzyMatch(key.toLowerCase(), queryLower);
    }
  });
}

function textSearch(list, query, mapper) {
  var queryLower = query.toLowerCase();

  return list.filter(item => {
    const key = mapper(item);

    if (_.isArray(key)) {
      return key.some(k => k.toLowerCase().indexOf(queryLower) !== -1);
    } else {
      return key.toLowerCase().indexOf(queryLower) !== -1;
    }
  });
}

function search(list, query, mapper) {
  return textSearch(list, query, mapper);
  // return fuzzyFilter(list, query, mapper);
}

function recipeId(recipe) {
  return (
    recipe.tool +
    recipe.category +
    recipe.item.name +
    recipe.platforms.join('') +
    recipe.ingredients.map(ingredient => ingredient.name).join('')
  );
}

function ingredientId(ingredient) {
  return ingredient.name;
}

class SearchBar extends React.Component {
  onChange = (event) => {
    const { onChange } = this.props;

    onChange(event.target.value);
  };

  render() {
    const { query } = this.props;

    return (
      <div className="SearchBar">
        <input type="text" value={query} onChange={this.onChange} />
      </div>
    );
  }
}

class Filters extends React.Component {
  onToolChange = (event) => {
    const { filters, onChange } = this.props;
    const updatedFilters = {
      ...filters,
      tool: event.target.value
    };

    onChange(updatedFilters);
  };

  render() {
    const { sources, filters } = this.props;

    return (
      <div className="Filters">
        <div>
          <div>
            <strong>Tool</strong>
          </div>
          <select value={filters.tool} onChange={this.onToolChange}>
            <option>All</option>
            {sources.map(source => <option key={source.tool}>{source.tool}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

class Ingredient extends React.Component {
  render() {
    const { ingredient } = this.props;

    return (
      <div className="Ingredient">
        <span>{ingredient.name}</span>
        <img className="icon" src={ingredient.icon} width={16} height={16} />
      </div>
    );
  }
}

class Recipe extends React.Component {
  render() {
    const { recipe } = this.props;

    return (
      <div className="Recipe hbox">
        <div>
          <div className="item">
            <img className="icon" src={recipe.item.icon} width={16} height={16} />
            <a href={recipe.item.href} target="_blank">{recipe.item.name}</a>
          </div>

          <div className="tool">{recipe.tool}</div>
        </div>

        <div className="flex-spacer" />

        <div className="ingredients">
          {recipe.ingredients.map(ingredient => <Ingredient key={ingredientId(ingredient)} ingredient={ingredient} />)}
        </div>
      </div>
    );
  }
}

function filterRecipes(recipes, query, filters) {
  return _.compose(
    _.partial(applyFilters, _, filters),
    _.partial(applyQuery, _, query),
  )(recipes);
}

function applyFilters(recipes, filters) {
  return _.compose(
    _.partial(applyToolFilter, _, filters.tool)
  )(recipes);
}

function applyToolFilter(recipes, tool) {
  return tool === 'All' ? recipes : recipes.filter(recipe => recipe.tool === tool);
}

function applyQuery(recipes, query) {
  return !query.trim() ? recipes : search(recipes, query, recipe => {
    return _.flatten([
      recipe.item.name,
      recipe.ingredients.map(ingredient => ingredient.name)
    ]);
  });
}

class RecipeList extends React.Component {
  render() {
    const { recipes, query, filters } = this.props;
    const filteredRecipes = filterRecipes(recipes, query, filters);

    return (
      <div className="RecipeList">
        <div className="hbox">
          <h3>Item ({filteredRecipes.length})</h3>
          <div className="flex-spacer" />
          <h3>Ingredients</h3>
        </div>

        {filteredRecipes.map(recipe => <Recipe key={recipeId(recipe)} recipe={recipe} />)}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    query: '',
    filters: {
      tool: 'All'
    }
  };

  onChangeQuery = (query) => {
    this.setState({query});
  };

  onFiltersChange = (filters) => {
    this.setState({filters});
  };

  render() {
    const { sources, recipes } = this.props;
    const { query, filters } = this.state;

    return (
      <div className="App">
        <h1>Terraria Recipes</h1>
        <SearchBar query={query} onChange={this.onChangeQuery} />
        <Filters sources={sources} filters={filters} onChange={this.onFiltersChange} />
        <RecipeList recipes={recipes} query={query} filters={filters} />
      </div>
    );
  }
}

fetch('data/recipes/raw-data-sources.json')
  .then(response => response.json())
  .then(dataSources => {
    const promises = dataSources
      .map(source => `/data/recipes/${source.target}`)
      .map(path => fetch(path));

    Promise.all(promises)
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(tools => {
        const recipesLists = tools.map(categories => (
          categories.map(category => (
            category.recipes.map(recipe => ({
              ...recipe,
              tool: category.tool,
              category: category.category
            }))
          ))
        ));

        const recipes = _.flatten(recipesLists);
        const desktopRecipes = recipes.filter(recipe => (
          recipe.platforms.length === 0 ||
          recipe.platforms.includes('desktop')
        ));

        ReactDOM.render(
          <App sources={dataSources} recipes={desktopRecipes} />,
          document.getElementById('app')
        );
      });

  });
