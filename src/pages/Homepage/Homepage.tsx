import React, { useEffect, useState } from "react";
import "./Homepage.scss";
import { useGetGalleryQuery } from "../../redux-toolkit/api/galleryApi";
import Filter from "../../components/Filter/Filter";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CheckboxIcon from "../../components/Checkbox/Checkbox";

const sectionOptions = ["hot", "top", "user"];
const sortOptions = ["top", "viral", "time"];
const windowOptions = ["day", "week", "month", "year", "all"];

const Homepage = () => {
  const [products, setProducts] = useState<string[]>([]);
  const [section, setSection] = useState<string>("hot");
  const [sort, setSort] = useState<string>("top");
  const [window, setWindow] = useState<string>("day");
  const [page, setPage] = useState<number>(1);
  const [showViral, setShowViral] = useState<boolean>(true);
  const [showMature, setShowMature] = useState<boolean>(false);
  const [albumPreviews, setAlbumPreviews] = useState<boolean>(false);
  const [isViral, setIsViral] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 20;
  const { data: productsData } = useGetGalleryQuery({
    section: section,
    sort: sort,
    window: window,
    page: page,
    showViral: showViral,
    showMature: showMature,
    albumPreviews: albumPreviews,
  });

  const fetchData = async () => {
    if (productsData) {
      await setProducts(productsData.data);
      console.log(products);
      setTotalProducts(productsData.data.length);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productsData]);
  const handleSectionFilterChange = (selectedValue: string | null) => {
    setSection(selectedValue || "");
  };
  const handleSortCheckboxChange = (isChecked: boolean) => {
    if (isChecked) {
      setSort("viral");
      setIsViral(true);
    } else {
      setSort("top");
      setIsViral(false);
    }
  };
  const handleSortFilterChange = (selectedValue: string | null) => {
    setSort(selectedValue || "");
  };
  const handleWindowFilterChange = (selectedValue: string | null) => {
    setWindow(selectedValue || "");
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="homepage__container">
      <h1 className="page__title">Image Gallery</h1>
      <div className="grid-triple-container">
        <div className="grid-item section__filter">
          <div className="section__input">
            <Filter
              key={`section-${section}`}
              filterOptions={sectionOptions}
              onFilterChange={handleSectionFilterChange}
              selectedFilter={section}
              defaultFilter="hot"
            />
          </div>
          <div className="section__input">
            <Filter
              key={`sort-${sort}`}
              filterOptions={sortOptions}
              onFilterChange={handleSortFilterChange}
              selectedFilter={sort}
              defaultFilter="top"
            />
          </div>
        </div>
        <div className="sort__window__section grid-item">
          <p className="viral__title">
            SHOW VIRAL VIDEOS
            <CheckboxIcon onCheckboxChange={handleSortCheckboxChange} />
          </p>
          <div className="window__filter">
            <Filter
              key={`window-${window}`}
              filterOptions={windowOptions}
              onFilterChange={handleWindowFilterChange}
              selectedFilter={window}
              defaultFilter="day"
            />
          </div>
        </div>
      </div>
      <div className="grid-container">
        {paginatedProducts?.map((product: any, index: number) => (
          <Link to={`/${product.id}`} key={index} className="grid-item">
            <Product
              viral={isViral}
              title={product.title}
              link={
                product.images === undefined
                  ? product.link
                  : product.images[0].link
              }
              type={
                product.images === undefined
                  ? "undefined"
                  : product.images[0].type
              }
            />
          </Link>
        ))}
      </div>
      <div className="pagination">
        <Stack
          spacing={2}
          justifyContent="center"
          className="pagination-container"
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
          />
        </Stack>
      </div>
    </div>
  );
};
export default Homepage;
