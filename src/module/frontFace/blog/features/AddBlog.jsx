// @ts-nocheck

import { Button, Row, Col, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect, useState } from "react";

import RSModal from "../../../../shared/modals/RSModal";
import RSForm from "../../../../shared/forms/RSForm";
import RSInput from "../../../../shared/forms/RSInput";
import RSSelect from "../../../../shared/forms/RSSelect";
import useStopScroll from "../../../../🔗Hook/useStopScroll";
import RSDatePicker from "../../../../shared/forms/RSDatePicker";

const AddBlog = () => {
  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (err) {}
  };
  const [searchValue, setSearchValue] = useState("");

  // add the category array in the constant file
  // make reusable funciton in utils to create this options with value and label
  const gender = ["web development", "Design", "other"];
  const genderOptions = gender.map((item) => ({
    value: item,
    label: item,
  }));

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex  mt-11 ${
          open
            ? "-translate-x-80 invisible opacity-0"
            : "visible -translate-x-0 opacity-100"
        } transition500`}
      >
        <Button
          onClick={() => setOpen(true)}
          className="p-6 rounded-full  border-none hover:!bg-primaryColor/10 hover:!text-primaryColor text-[18px] hover:border-none  hover:shadow-primaryColor/10 hover:shadow-xl"
        >
          Add Blog
        </Button>
      </div>

      {/* Modal */}

      <RSModal {...{ open, setOpen }}>
        <Row
          className="block py-16"
          justify="center"
          align="middle"
          style={{ width: "100%", maxWidth: "800px", margin: "auto" }}
        >
          <RSForm resolver={""} onSubmit={onSubmit}>
            {/* Food Name & Image URL */}
            <Row gutter={16}>
            <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="title"
                  label="Title:"
                  key={"title"}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <RSInput
                  type="text"
                  name="imageURL"
                  label="Image:"
                  key={"imageURL"}
                />
              </Col>
            </Row>

            {/* Category & Price */}
            <Row gutter={16}>
              <Col span={24} md={{ span: 12 }}>
                <RSSelect
                  defaultValue={"Select category"}
                  label="Category"
                  name="category"
                  options={genderOptions}
                />
              </Col>
              
              <Col span={24} md={{ span: 12 }}>
                <RSDatePicker name={"blogDate"} label={"Date"}/>
              </Col>
              
            </Row>
              <Col span={24} md={{ span: 24 }}>
                <TextArea placeholder="Write description" rows={4}/>
              </Col>

            <Button
              htmlType="submit"
              className="w-full bg-primaryColor text-[white] hover:!bg-primary-color border-none hover:!text-[white] mt-3"
            >
              Save
            </Button>
          </RSForm>
        </Row>
      </RSModal>
    </>
  );
};

export default AddBlog;
