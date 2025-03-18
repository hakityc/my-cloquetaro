import { CreateOfferInput } from "@test-hono/server/src/services/offerService.ts";
import { Button, Form, Input, Modal, Select } from "antd";
import { css } from "goober";
import { useState } from "react";
import { client } from "../../api";

const CreateOfferModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CreateOfferInput>();
  const redirectTypeOptions = [
    {
      value: "HTTP_REDIRECT",
      label: "HTTP-redirect",
    },
  ];
  const handleSubmit = async (values: CreateOfferInput) => {
    console.log(values);
    setIsModalOpen(false);
    form.resetFields();
    try {
      await client.offers.$post({
        json: values,
      });
    } catch (error) {}
  };

  return (
    <>
      <Button
        type="primary"
        className={css`
          width: 100px;
        `}
        onClick={() => setIsModalOpen(true)}
      >
        Create Offer
      </Button>
      <Modal
        title="Create Offer"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Offer name"
            name="name"
            rules={[{ required: true, message: "Please enter offer name" }]}
          >
            <Input placeholder="Enter offer name" />
          </Form.Item>
          <Form.Item
            label="Redirect type"
            name="redirectType"
            rules={[{ required: true, message: "Please select redirect type" }]}
          >
            <Select placeholder="Select redirect type" options={redirectTypeOptions} />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: "Please enter URL" }]}
          >
            <Input placeholder="Enter URL" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateOfferModal;
