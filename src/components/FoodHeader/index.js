import { BsFilterRight } from "react-icons/bs";

import "./index.css";

const ProductsHeader = (props) => {
  const { foodCategory, activeCategory } = props;

  const onChangeFoodCategory = (event) => {
    const { changeFoodCategory } = props;
    changeFoodCategory(event.target.value);
  };

  return (
    <div className="products-header">
      <h1 className="products-list-heading">
        Feast on our restaurant's culinary delights
      </h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeCategory}
          onChange={onChangeFoodCategory}
        >
          {foodCategory.map((eachOption) => (
            <option
              key={eachOption.categoryId}
              value={eachOption.name}
              className="select-option"
            >
              {eachOption.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
