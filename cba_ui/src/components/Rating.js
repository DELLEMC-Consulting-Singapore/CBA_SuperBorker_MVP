import React from "react";
import { Button, Pagination } from "antd";
import "./css/ratings.css";

const itemRender = (_, type, originalElement) => {
  if (type === "prev") {
    return <a>Previous</a>;
  }
  if (type === "next") {
    return <a>Next</a>;
  }
  return originalElement;
};
export const Rating = () => {
  return (
    <>
      <p>
        To submit the feature request please <a>Click Here</a>
      </p>
      <div _ngcontent-vgh-c294="" class="dds__container-fluid dds__px-0">
        <div _ngcontent-vgh-c294="" class="dds__row">
          <div
            _ngcontent-vgh-c294=""
            class="dds__col-2 dds__col--sm-6 dds__col--md-12 dds__col--lg-12 dds__col--xl-6 dds__col--3xl-5 dds__my-3"
          >
            <ddc-rating-card _ngcontent-vgh-c294="" _nghost-vgh-c291="">
              <div class="dds__card dds__p-4">
                <div class="dds__card__content dds__p-0">
                  <div class="dds__card__header">
                    <h5 class="dds__card__header__text dds__mb-0">
                      Customer Rating
                    </h5>
                  </div>
                  <div class="dds__card__body">
                    <p class="dds__mb-4">
                      Overall rating provided by the Customers of the service
                    </p>
                    <div class="dds__container-fluid dds__px-0">
                      <div class="dds__row">
                        <div class="dds__col-2 dds__col--sm-4 dds__col--md-8 dds__px-0 dds__d-flex dds__align-items-center dds__justify-content-center dds__justify-content-sm-start">
                          <div class="text-80 dds__m-0"> 4.8 </div>
                          <div class="dds__flex dds__flex-column text-21 dds__pl-4">
                            <div>
                              <ddc-rating-stars _nghost-vgh-c288="">
                                <div
                                  _ngcontent-vgh-c288=""
                                  class="ddc-rating-stars dds__d-flex"
                                >
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                </div>
                              </ddc-rating-stars>
                            </div>
                            <div>Average Rating</div>
                          </div>
                        </div>
                        <div class="dds__col-2 dds__col--sm-2 dds__col--md-4 dds__px-0 dds__pt-2 dds__pt-sm-5 dds__d-flex dds__justify-content-center dds__justify-content-sm-start">
                          <ddc-button btnsize="sm" _nghost-vgh-c272="">
                            <Button
                              type="primary"
                              size="large"
                              htmlType="submit"
                              className="button-css"
                            >
                              Provide Feedback
                            </Button>
                          </ddc-button>
                        </div>
                      </div>
                    </div>
                    <div class="dds__container-fluid dds__px-0">
                      <div class="dds__row dds__mt-5 dds__mb-2">
                        <div class="dds__col-1 dds__col--sm-4 dds__col--md-8 dds__px-0">
                          <strong>Category</strong>
                        </div>
                        <div class="dds__col-1 dds__col--sm-2 dds__col--md-4 dds__px-0">
                          <strong>Rating</strong>
                        </div>
                      </div>
                    </div>
                    <div class="dds__container-fluid dds__px-0">
                      <div class="rating-category dds__row dds__py-3">
                        <div class="dds__col-1 dds__col--sm-4 dds__col--md-8 dds__px-0">
                          <div
                            class="dds__d-flex dds__align-items-center"
                            id="tootltip-trigger-456110000"
                            aria-describedby=" 549534541"
                          >
                            <i class="dds__icon dds__icon--doc-add dds__pl-2 text-20"></i>
                            <div class="dds__ml-4"> Ease to provision </div>
                          </div>
                          <div
                            class="dds__tooltip"
                            data-dds="tooltip"
                            data-trigger="#tootltip-trigger-456110000"
                            id="549534541"
                          >
                            <div class="dds__tooltip__pointer"></div>
                            <div class="dds__tooltip__body">
                              how easy to provision an instance
                            </div>
                          </div>
                        </div>
                        <div class="dds__col-1 dds__col--sm-2 dds__col--md-4 dds__px-0">
                          <div class="dds__d-flex dds__align-items-center">
                            <div style={{ "font-size": "17px" }}>
                              <ddc-rating-stars _nghost-vgh-c288="">
                                <div
                                  _ngcontent-vgh-c288=""
                                  class="ddc-rating-stars dds__d-flex"
                                >
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                </div>
                              </ddc-rating-stars>
                            </div>
                            <div class="dds__ml-2 mt--3"> 4.8 </div>
                          </div>
                        </div>
                      </div>
                      <div class="rating-category dds__row dds__py-3">
                        <div class="dds__col-1 dds__col--sm-4 dds__col--md-8 dds__px-0">
                          <div
                            class="dds__d-flex dds__align-items-center"
                            id="tootltip-trigger-78810000"
                            aria-describedby=" 560245393"
                          >
                            <i class="dds__icon dds__icon--charge-back dds__pl-2 text-20"></i>
                            <div class="dds__ml-4"> Pricing </div>
                          </div>
                          <div
                            class="dds__tooltip"
                            data-dds="tooltip"
                            data-trigger="#tootltip-trigger-78810000"
                            id="560245393"
                          >
                            <div class="dds__tooltip__pointer"></div>
                            <div class="dds__tooltip__body">
                              Service plan pricing
                            </div>
                          </div>
                        </div>
                        <div class="dds__col-1 dds__col--sm-2 dds__col--md-4 dds__px-0">
                          <div class="dds__d-flex dds__align-items-center">
                            <div style={{ "font-size": "17px" }}>
                              <ddc-rating-stars _nghost-vgh-c288="">
                                <div
                                  _ngcontent-vgh-c288=""
                                  class="ddc-rating-stars dds__d-flex"
                                >
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                </div>
                              </ddc-rating-stars>
                            </div>
                            <div class="dds__ml-2 mt--3"> 4.8 </div>
                          </div>
                        </div>
                      </div>
                      <div class="rating-category dds__row dds__py-3">
                        <div class="dds__col-1 dds__col--sm-4 dds__col--md-8 dds__px-0">
                          <div
                            class="dds__d-flex dds__align-items-center"
                            id="tootltip-trigger-6433910000"
                            aria-describedby=" 707485706"
                          >
                            <i class="dds__icon dds__icon--gear-wrench dds__pl-2 text-20"></i>
                            <div class="dds__ml-4"> Features </div>
                          </div>
                          <div
                            class="dds__tooltip"
                            data-dds="tooltip"
                            data-trigger="#tootltip-trigger-6433910000"
                            id="707485706"
                          >
                            <div class="dds__tooltip__pointer"></div>
                            <div class="dds__tooltip__body">
                              Service offered features
                            </div>
                          </div>
                        </div>
                        <div class="dds__col-1 dds__col--sm-2 dds__col--md-4 dds__px-0">
                          <div class="dds__d-flex dds__align-items-center">
                            <div style={{ "font-size": "17px" }}>
                              <ddc-rating-stars _nghost-vgh-c288="">
                                <div
                                  _ngcontent-vgh-c288=""
                                  class="ddc-rating-stars dds__d-flex"
                                >
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                </div>
                              </ddc-rating-stars>
                            </div>
                            <div class="dds__ml-2 mt--3"> 4.8 </div>
                          </div>
                        </div>
                      </div>
                      <div class="rating-category dds__row dds__py-3">
                        <div class="dds__col-1 dds__col--sm-4 dds__col--md-8 dds__px-0">
                          <div
                            class="dds__d-flex dds__align-items-center"
                            id="tootltip-trigger-8067710000"
                            aria-describedby=" 212763222"
                          >
                            <i class="dds__icon dds__icon--doc-lines dds__pl-2 text-20"></i>
                            <div class="dds__ml-4"> Documentation </div>
                          </div>
                          <div
                            class="dds__tooltip"
                            data-dds="tooltip"
                            data-trigger="#tootltip-trigger-8067710000"
                            id="212763222"
                          >
                            <div class="dds__tooltip__pointer"></div>
                            <div class="dds__tooltip__body">
                              Service documentation
                            </div>
                          </div>
                        </div>
                        <div class="dds__col-1 dds__col--sm-2 dds__col--md-4 dds__px-0">
                          <div class="dds__d-flex dds__align-items-center">
                            <div style={{ "font-size": "17px" }}>
                              <ddc-rating-stars _nghost-vgh-c288="">
                                <div
                                  _ngcontent-vgh-c288=""
                                  class="ddc-rating-stars dds__d-flex"
                                >
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                </div>
                              </ddc-rating-stars>
                            </div>
                            <div class="dds__ml-2 mt--3"> 4.8 </div>
                          </div>
                        </div>
                      </div>
                      <div class="rating-category dds__row dds__py-3">
                        <div class="dds__col-1 dds__col--sm-4 dds__col--md-8 dds__px-0">
                          <div
                            class="dds__d-flex dds__align-items-center"
                            id="tootltip-trigger-7217910000"
                            aria-describedby=" 374087925"
                          >
                            <i class="dds__icon dds__icon--assistance dds__pl-2 text-20"></i>
                            <div class="dds__ml-4"> Support </div>
                          </div>
                          <div
                            class="dds__tooltip"
                            data-dds="tooltip"
                            data-trigger="#tootltip-trigger-7217910000"
                            id="374087925"
                          >
                            <div class="dds__tooltip__pointer"></div>
                            <div class="dds__tooltip__body">
                              Service support
                            </div>
                          </div>
                        </div>
                        <div class="dds__col-1 dds__col--sm-2 dds__col--md-4 dds__px-0">
                          <div class="dds__d-flex dds__align-items-center">
                            <div style={{ "font-size": "17px" }}>
                              <ddc-rating-stars _nghost-vgh-c288="">
                                <div
                                  _ngcontent-vgh-c288=""
                                  class="ddc-rating-stars dds__d-flex"
                                >
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                  <div _ngcontent-vgh-c288="">
                                    <i
                                      _ngcontent-vgh-c288=""
                                      class="dds__icon dds__pr-1 active dds__icon--star-filled"
                                    ></i>
                                  </div>
                                </div>
                              </ddc-rating-stars>
                            </div>
                            <div class="dds__ml-2 mt--3"> 4.8 </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ddc-rating-card>
          </div>
          <div
            _ngcontent-vgh-c294=""
            class="dds__col-2 dds__col--sm-6 dds__col--md-12 dds__my-3 dds__col--lg-12 dds__col--xl-6 dds__col--3xl-7 dds__pr-3"
          >
            <div _ngcontent-vgh-c294="" class="dds__card dds__p-4">
              <h5
                _ngcontent-vgh-c294=""
                class="text-32 dds__font-weight-light dds__mb-3"
              >
                {" "}
                Customer Comments{" "}
              </h5>
              <div _ngcontent-vgh-c294="" class="comments-container">
                <ddc-comments _ngcontent-vgh-c294="" _nghost-vgh-c292="">
                  <div _ngcontent-vgh-c292="" class="comment-container">
                    <div _ngcontent-vgh-c292="" class="icon-block">
                      <i
                        _ngcontent-vgh-c292=""
                        class="dds__icon dds__icon--clock-arrow-left"
                      ></i>
                    </div>
                    <div
                      _ngcontent-vgh-c292=""
                      class="text-block text-block--divider"
                    >
                      <div _ngcontent-vgh-c292="" class="header">
                        <span _ngcontent-vgh-c292="" class="title">
                          Anonymous
                        </span>
                        <span _ngcontent-vgh-c292="" class="date">
                          03-06-2023 19:51
                        </span>
                      </div>
                      <div _ngcontent-vgh-c292="" class="detail">
                        <span _ngcontent-vgh-c292=""> No comment </span>
                      </div>
                    </div>
                  </div>
                </ddc-comments>
              </div>
              <ddc-paginator
                _ngcontent-vgh-c294=""
                label="Comments"
                _nghost-vgh-c293=""
              >
                <div
                  _ngcontent-vgh-c293=""
                  data-dds="pagination"
                  role="navigation"
                  class="dds__pagination dds__pagination--width-640"
                >
                  {/* <div _ngcontent-vgh-c293="" class="dds__pagination__summary">
                    <label
                      _ngcontent-vgh-c293=""
                      for="pagination-per-page"
                      class="dds__pagination__per-page-label"
                    >
                      Comments per page
                    </label>
                    <div
                      _ngcontent-vgh-c293=""
                      data-dds="select"
                      class="dds__select dds__select--sm dds__pagination__per-page-select"
                    >
                      <div _ngcontent-vgh-c293="" class="dds__select__wrapper">
                        <select
                          _ngcontent-vgh-c293=""
                          id="pagination-per-page"
                          aria-label="Items per page"
                          class="dds__select__field"
                        >
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        <svg
                          class="dds__icon dds__select__chevron"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M30.48 7.24l-14.48 14.48-14.48-14.48-1.52 1.52 16 16 16-16z"></path>
                        </svg>
                        <svg
                          class="dds__icon dds__select__feedback__icon"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M15 21L15 7H17V21H15Z"></path>
                          <path d="M15 23V25H17V23H15Z"></path>
                          <path d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16ZM16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2Z"></path>
                        </svg>
                      </div>
                    </div>
                    <div
                      _ngcontent-vgh-c293=""
                      aria-live="polite"
                      class="dds__pagination__range"
                    >
                      <span
                        _ngcontent-vgh-c293=""
                        class="dds__pagination__range-start"
                      >
                        1
                      </span>{" "}
                      -{" "}
                      <span
                        _ngcontent-vgh-c293=""
                        class="dds__pagination__range-end"
                      >
                        1
                      </span>
                      <span
                        _ngcontent-vgh-c293=""
                        class="dds__pagination__range-total-label"
                      >
                        {" "}
                        of{" "}
                        <span
                          _ngcontent-vgh-c293=""
                          class="dds__pagination__range-total"
                        >
                          1
                        </span>{" "}
                        items{" "}
                      </span>
                    </div>
                  </div>
                  <div _ngcontent-vgh-c293="" class="dds__pagination__nav">
                    <button
                      _ngcontent-vgh-c293=""
                      aria-label="First page"
                      class="dds__button dds__button--tertiary dds__button--sm dds__button__icon dds__pagination__first-page"
                      aria-disabled="true"
                    >
                      <svg
                        class="dds__icon"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M25.2 0l-16.26 15.56v-15.56h-2.14v32h2.14v-15.56l16.26 15.56v-32zM23.060 27l-11.5-11 11.5-11z"></path>
                      </svg>
                    </button>
                    <button
                      _ngcontent-vgh-c293=""
                      aria-label="Previous page"
                      class="dds__button dds__button--tertiary dds__button--sm dds__pagination__prev-page"
                      aria-disabled="true"
                    >
                      <svg
                        class="dds__icon dds__button__icon--start dds__pagination__prev-page__icon"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M7.64 16l16.72 16v-32zM22.22 27l-11.5-11 11.5-11z"></path>
                      </svg>
                      <span
                        _ngcontent-vgh-c293=""
                        class="dds__pagination__prev-page-label"
                      >
                        Previous
                      </span>
                    </button>
                    <div
                      _ngcontent-vgh-c293=""
                      class="dds__pagination__page-range"
                    >
                      <label
                        _ngcontent-vgh-c293=""
                        for="pagination-current-page"
                        class="dds__pagination__page-range-label"
                      >
                        Page
                      </label>
                      <div
                        _ngcontent-vgh-c293=""
                        class="dds__input-text__container dds__input-text__container--sm"
                      >
                        <div
                          _ngcontent-vgh-c293=""
                          class="dds__input-text__wrapper dds__pagination__page-range-current-wrapper"
                        >
                          <input
                            _ngcontent-vgh-c293=""
                            type="text"
                            id="pagination-current-page"
                            class="dds__input-text dds__pagination__page-range-current"
                            aria-describedby="Pagination-input-description-942973185"
                          ></input>
                          <span
                            id="Pagination-input-description-942973185"
                            class="dds__sr-only Pagination-aria-description"
                          >
                            Navigate to page from 1 to 1
                          </span>
                        </div>
                      </div>
                      <div
                        _ngcontent-vgh-c293=""
                        class="dds__pagination__page-range-total-label"
                      >
                        {" "}
                        of{" "}
                        <span
                          _ngcontent-vgh-c293=""
                          class="dds__pagination__page-range-total"
                        >
                          1
                        </span>
                      </div>
                    </div>
                    <button
                      _ngcontent-vgh-c293=""
                      aria-label="Next page"
                      class="dds__button dds__button--tertiary dds__button--sm dds__pagination__next-page"
                      aria-disabled="true"
                    >
                      <span
                        _ngcontent-vgh-c293=""
                        class="dds__pagination__next-page-label"
                      >
                        Next
                      </span>
                      <svg
                        class="dds__icon dds__button__icon--end dds__pagination__next-page__icon"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M7.64 0v32l16.72-16zM9.78 5l11.5 11-11.5 11z"></path>
                      </svg>
                    </button>
                    <button
                      _ngcontent-vgh-c293=""
                      aria-label="Last page"
                      class="dds__button dds__button--tertiary dds__button--sm dds__button__icon dds__pagination__last-page"
                      aria-disabled="true"
                    >
                      <svg
                        class="dds__icon"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path d="M23.060 0v15.56l-16.26-15.56v32l16.26-15.56v15.56h2.14v-32zM8.94 27v-22l11.5 11z"></path>
                      </svg>
                    </button>
                  </div> */}

                  <Pagination
                    total={1}
                    itemRender={itemRender}
                    showSizeChanger
                  />
                </div>
              </ddc-paginator>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
