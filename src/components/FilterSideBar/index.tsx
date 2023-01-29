// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel,
  Paper,
} from "@mui/material";
import Iconify from "~/components/Iconify";

// ----------------------------------------------------------------------
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GetAllCategoies,
  GetAllSubCategoies,
} from "~/repositories/ProductCategory.service";
import { getAllTypes } from "~/repositories/productType.service";
import ColapsableSubPage from "../ColapsableSubPage";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export const FILTER_GENDER_OPTIONS = ["Men", "Women", "Kids"];
export const FILTER_CATEGORY_OPTIONS = [
  "All",
  "Shose",
  "Apparel",
  "Accessories",
];
export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];
export const FILTER_PRICE_OPTIONS = [
  { value: "below", label: "Below $25" },
  { value: "between", label: "Between $25 - $75" },
  { value: "above", label: "Above $75" },
];
export const FILTER_COLOR_OPTIONS = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

// ----------------------------------------------------------------------

interface ProductProps {
  products: Array<any>;
  filtredProduct: Array<any>;
  onFilter: (item: any) => void;
}
const ShopFilterSidebar: FC<ProductProps> = ({ products, onFilter }) => {
  const formatedData = useMemo(() => {
    const formated = products?.map((product: any) => {
      return { ...product, show: true };
    });
    return formated;
  }, [products]);

  const [productCategory, setProductCategory] = useState<Array<any>>([]);
  const [productSubCategory, setProductSubCategory] = useState<Array<any>>([]);
  const [productTypes, setProductTypes] = useState<Array<any>>([]);
  const [categoryFilterArray, setCategoryFilterArray] = useState<Array<string>>(
    []
  );
  const [subCategoryFilterArray, setSubCategoryFilterArray] = useState<
    Array<string>
  >([]);
  const [typeFilterArray, setTypeFilterArray] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const GetAllProductCategoies = useRef(GetAllCategoies);
  const GetAllProductsSubCategories = useRef(GetAllSubCategoies);
  const GetAllTypes = useRef(getAllTypes);

  const getAllProductCategory = useCallback(async () => {
    await GetAllProductCategoies.current().then(
      (response) => {
        setProductCategory(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    getAllProductCategory();
  }, [getAllProductCategory]);

  const getAllProductSubCategory = useCallback(async () => {
    await GetAllProductsSubCategories.current().then(
      (response) => {
        setProductSubCategory(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    getAllProductSubCategory();
  }, [getAllProductSubCategory]);

  const getAllProductTypes = useCallback(async () => {
    await GetAllTypes.current().then(
      (response) => {
        setProductTypes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    getAllProductTypes();
  }, [getAllProductTypes]);

  const handleFilterByCategory = useCallback(
    (value: string, checked: any) => {
      if (checked) {
        const temp = categoryFilterArray;
        setCategoryFilterArray((prev) => {
          prev.push(value);
          return prev;
        });
        temp?.push(value);
        const filtredData = formatedData?.map((product: any) => {
          return {
            ...product,
            show:
              typeFilterArray?.length > 0 && subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp?.includes(item.productcategoryid) &&
                        typeFilterArray?.includes(item.producttypeid) &&
                        subCategoryFilterArray?.includes(
                          item.productsubcategoryid
                        )
                    );
                  })
                : typeFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      typeFilterArray?.includes(item.producttypeid)
                    );
                  })
                : subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      subCategoryFilterArray?.includes(
                        item.productsubcategoryid
                      )
                    );
                  })
                : product?.productdetails?.some((item: any) => {
                    return Boolean(temp?.includes(item.productcategoryid));
                  }),
          };
        });

        const filtered = filtredData?.filter((item: any) => item.show);
        onFilter(filtered);
      } else {
        const temp = categoryFilterArray;
        setCategoryFilterArray((prev) => prev.filter((item) => item !== value));
        const temp1 = temp?.filter((item) => item !== value);
        const filtredData = formatedData?.map((product: any) => {
          return {
            ...product,
            show:
              temp1?.length > 0 &&
              typeFilterArray?.length > 0 &&
              subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp1?.includes(item.productcategoryid) &&
                        typeFilterArray?.includes(item.producttypeid) &&
                        subCategoryFilterArray?.includes(
                          item.productsubcategoryid
                        )
                    );
                  })
                : temp1?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(temp1?.includes(item.productcategoryid));
                  })
                : typeFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      typeFilterArray?.includes(item.producttypeid)
                    );
                  })
                : subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      subCategoryFilterArray?.includes(
                        item.productsubcategoryid
                      )
                    );
                  })
                : true,
          };
        });
        const filtered = filtredData?.filter((item: any) => item.show);
        onFilter(filtered);
      }
    },
    [
      categoryFilterArray,
      formatedData,
      onFilter,
      subCategoryFilterArray,
      typeFilterArray,
    ]
  );

  const handleFilterBySubCategory = useCallback(
    (value: string, checked: any) => {
      if (checked) {
        const temp = subCategoryFilterArray;
        setSubCategoryFilterArray((prev) => {
          prev.push(value);
          return prev;
        });
        temp?.push(value);
        const filtredData = formatedData?.map((product: any) => {
          return {
            ...product,
            show:
              typeFilterArray?.length > 0 && categoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp?.includes(item.productsubcategoryid) &&
                        typeFilterArray?.includes(item.producttypeid) &&
                        categoryFilterArray?.includes(item.productcategoryid)
                    );
                  })
                : product?.productdetails?.some((item: any) => {
                    return Boolean(temp?.includes(item.productsubcategoryid));
                  }),
          };
        });

        const filtered = filtredData?.filter((item: any) => item.show);
        onFilter(filtered);
      } else {
        const temp = subCategoryFilterArray;
        setSubCategoryFilterArray((prev) =>
          prev.filter((item) => item !== value)
        );
        const temp1 = temp?.filter((item) => item !== value);
        const filtredData = formatedData?.map((product: any) => {
          return {
            ...product,
            show:
              temp1?.length > 0 &&
              typeFilterArray?.length > 0 &&
              categoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp1?.includes(item.productsubcategoryid) &&
                        typeFilterArray?.includes(item.producttypeid) &&
                        categoryFilterArray?.includes(item.productcategoryid)
                    );
                  })
                : temp1?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(temp1?.includes(item.productsubcategoryid));
                  })
                : categoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      categoryFilterArray?.includes(item.productcategoryid)
                    );
                  })
                : typeFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      typeFilterArray?.includes(item.producttypeid)
                    );
                  })
                : true,
          };
        });
        const filtered = filtredData?.filter((item: any) => item.show);
        onFilter(filtered);
      }
    },
    [
      subCategoryFilterArray,
      formatedData,
      onFilter,
      typeFilterArray,
      categoryFilterArray,
    ]
  );

  const handleFilterByType = useCallback(
    (value: string, checked: any) => {
      if (checked) {
        const temp = typeFilterArray;
        setTypeFilterArray((prev) => {
          prev.push(value);
          return prev;
        });
        temp?.push(value);
        const filtredData = formatedData?.map((product: any) => {
          return {
            ...product,
            show:
              categoryFilterArray?.length > 0 &&
              subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp?.includes(item.producttypeid) &&
                        categoryFilterArray?.includes(item.productcategoryid) &&
                        subCategoryFilterArray?.includes(
                          item.productsubcategoryid
                        )
                    );
                  })
                : categoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp?.includes(item.producttypeid) &&
                        categoryFilterArray?.includes(item.productcategoryid)
                    );
                  })
                : subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp?.includes(item.producttypeid) &&
                        subCategoryFilterArray?.includes(
                          item.productsubcategoryid
                        )
                    );
                  })
                : product?.productdetails?.some((item: any) => {
                    return Boolean(temp?.includes(item.producttypeid));
                  }),
          };
        });

        const filtered = filtredData?.filter((item: any) => item.show);
        onFilter(filtered);
      } else {
        const temp = typeFilterArray;
        setTypeFilterArray((prev) => prev.filter((item) => item !== value));
        const temp1 = temp?.filter((item) => item !== value);
        const filtredData = formatedData?.map((product: any) => {
          return {
            ...product,
            show:
              temp1?.length > 0 &&
              categoryFilterArray?.length > 0 &&
              subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      temp1?.includes(item.producttypeid) &&
                        categoryFilterArray?.includes(item.productcategoryid) &&
                        subCategoryFilterArray?.includes(
                          item.productsubcategoryid
                        )
                    );
                  })
                : temp1?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(temp1?.includes(item.producttypeid));
                  })
                : categoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      categoryFilterArray?.includes(item.productcategoryid)
                    );
                  })
                : subCategoryFilterArray?.length > 0
                ? product?.productdetails?.some((item: any) => {
                    return Boolean(
                      subCategoryFilterArray?.includes(
                        item.productsubcategoryid
                      )
                    );
                  })
                : true,
          };
        });
        const filtered = filtredData?.filter((item: any) => item.show);
        onFilter(filtered);
      }
    },
    [
      typeFilterArray,
      formatedData,
      onFilter,
      categoryFilterArray,
      subCategoryFilterArray,
    ]
  );

  const handleFilterByPrice = useCallback(
    (value: string) => {
      setValue(value);
      if (value === "below") {
        const filtered = formatedData?.filter((product: any) =>
          product?.productdetails?.some((item: any) => item.customerprice < 25)
        );
        onFilter(filtered);
        return filtered;
      } else if (value === "between") {
        const filtered = formatedData?.filter((product: any) =>
          product?.productdetails?.some(
            (item: any) => item.customerprice > 25 && item.customerprice < 75
          )
        );
        onFilter(filtered);
        return filtered;
      } else {
        const filtered = formatedData?.filter((product: any) =>
          product?.productdetails?.some((item: any) => item.customerprice > 75)
        );
        onFilter(filtered);
        return filtered;
      }
    },
    [formatedData, onFilter]
  );

  const handleReset = useCallback(() => {
    setValue("");
    setCategoryFilterArray([]);
    setSubCategoryFilterArray([]);
    setTypeFilterArray([]);
    onFilter(products);
  }, [onFilter]);

  useEffect(() => {
    const priceFiltering =
      value !== "" ? handleFilterByPrice(value) : formatedData;
    const filtredData = priceFiltering?.map((product: any) => {
      return {
        ...product,
        show:
          categoryFilterArray?.length > 0 &&
          typeFilterArray?.length > 0 &&
          subCategoryFilterArray?.length > 0
            ? product?.productdetails?.some((item: any) => {
                return Boolean(
                  categoryFilterArray?.includes(item.productcategoryid) &&
                    typeFilterArray?.includes(item.producttypeid) &&
                    subCategoryFilterArray?.includes(item.productsubcategoryid)
                );
              })
            : categoryFilterArray?.length > 0
            ? product?.productdetails?.some((item: any) => {
                return Boolean(
                  categoryFilterArray?.includes(item.productcategoryid)
                );
              })
            : subCategoryFilterArray?.length > 0
            ? product?.productdetails?.some((item: any) => {
                return Boolean(
                  subCategoryFilterArray?.includes(item.productsubcategoryid)
                );
              })
            : typeFilterArray?.length > 0
            ? product?.productdetails?.some((item: any) => {
                return Boolean(typeFilterArray?.includes(item.producttypeid));
              })
            : true,
      };
    });

    const filtered = filtredData?.filter((item: any) => item.show);
    onFilter(filtered);
  }, [
    categoryFilterArray,
    formatedData,
    handleFilterByPrice,
    onFilter,
    subCategoryFilterArray,
    typeFilterArray,
    value,
  ]);

  const findSelected = useCallback(
    (category: string) => {
      const filtredCategories = productSubCategory?.filter(
        (subCategory: any) => subCategory.productcategoryid === category
      );
      const filtred = filtredCategories?.filter((subCategory: any) =>
        subCategoryFilterArray?.some(
          (item: any) => item === subCategory.productcategoryid
        )
      );
      if (filtred?.length > 0) return true;
      return false;
    },
    [productSubCategory, subCategoryFilterArray]
  );

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          minHeight: "100vh",
          height: "100%",
          border: "none",
          overflow: "hidden",
          borderRadius: "0",
          marginBottom: "10px",
          // [theme.breakpoints.up("lg")]: {
          //   width: "35%",
          // },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
        </Stack>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleReset}
          >
            Clear All
          </Button>
        </Box>
        <Stack spacing={3} sx={{ p: 1, mb: "50px" }}>
          <div>
            <Typography
              sx={{
                fontSize: "20px!important",
              }}
              gutterBottom
            >
              Category
            </Typography>
            <Divider
              sx={{
                width: "10%",
                background: "#000",
                mb: "15px",
                height: "2px",
              }}
            />

            <FormGroup>
              {productCategory?.length > 0 &&
                productCategory?.map((category: any, index: number) => (
                  <ColapsableSubPage
                    key={`${category?.productcategoryid} ${index} category`}
                    title={
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={category.productcategory}
                            onChange={(e) =>
                              handleFilterByCategory(
                                category?.productcategoryid,
                                e.target.checked
                              )
                            }
                            checked={
                              findSelected(category?.productcategoryid) ||
                              categoryFilterArray?.includes(
                                category?.productcategoryid
                              )
                            }
                          />
                        }
                        label={category.productcategory}
                        sx={{
                          span: {
                            fontSize: "14px !important",
                          },
                          fontWeight: "400 !important",
                          height: "30px",
                        }}
                      />
                    }
                    children={
                      <Box sx={{ ml: "10px" }}>
                        <FormGroup>
                          {productSubCategory?.length > 0 &&
                            productSubCategory?.map(
                              (item: any, index: number) => (
                                <div
                                  key={`${item.productcategoryid} ${index} subCategory`}
                                >
                                  {item.productcategoryid ===
                                  category.productcategoryid ? (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name={item.productsubcategory}
                                          onChange={(e) =>
                                            handleFilterBySubCategory(
                                              item?.productsubcategoryid,
                                              e.target.checked
                                            )
                                          }
                                          checked={subCategoryFilterArray?.includes(
                                            item?.productsubcategoryid
                                          )}
                                        />
                                      }
                                      label={item.productsubcategory}
                                      sx={{
                                        span: {
                                          fontSize: "14px !important",
                                        },
                                        fontWeight: "400 !important",
                                        height: "30px",
                                      }}
                                    />
                                  ) : null}
                                </div>
                              )
                            )}
                        </FormGroup>
                      </Box>
                    }
                  />
                ))}
            </FormGroup>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Types
            </Typography>
            <Divider
              sx={{
                width: "10%",
                background: "#000",
                mb: "15px",
                height: "2px",
              }}
            />
            <RadioGroup>
              {productTypes?.length > 0 &&
                productTypes?.map((item: any, index: number) => (
                  <FormControlLabel
                    key={`${item.producttypeid} ${index} type`}
                    control={
                      <Checkbox
                        name={item.producttypeid}
                        onChange={(e) =>
                          handleFilterByType(item?.type, e.target.checked)
                        }
                      />
                    }
                    label={item.producttype}
                    sx={{
                      span: {
                        fontSize: "14px !important",
                      },
                      fontWeight: "400 !important",
                      height: "30px",
                    }}
                  />
                ))}
            </RadioGroup>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              Price
            </Typography>
            <Divider
              sx={{
                width: "10%",
                background: "#000",
                mb: "15px",
                height: "2px",
              }}
            />
            <RadioGroup
              value={value}
              onChange={(e) => handleFilterByPrice(e.target.value)}
            >
              {FILTER_PRICE_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio checked={value === item.value} />}
                  label={item.label}
                  sx={{
                    span: {
                      fontSize: "14px !important",
                    },
                    fontWeight: "400 !important",
                    height: "30px",
                  }}
                />
              ))}
            </RadioGroup>
          </div>
        </Stack>
      </Paper>
    </>
  );
};
export default ShopFilterSidebar;
