import { Modal, Descriptions, Button, Image, Tag, Typography } from 'antd';
import { DollarOutlined, BarcodeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductDetailsModal = ({ isVisible, handleCancel, product }) => {
  return (
    <Modal
      title={<Title level={3} style={{ textAlign: 'center', marginBottom: 0 }}>Product Details</Title>}
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="close" type="primary" onClick={handleCancel}>
          Close
        </Button>,
      ]}
      centered
      bodyStyle={{
        padding: '24px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <Image
          width={200}
          src={product?.image_url}
          alt={product?.item_name}
          style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        />
        <Tag color={product?.stock > 0 ? 'green' : 'red'} style={{ marginTop: '10px', fontSize: '14px' }}>
          {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Tag>
      </div>

      <Descriptions
        bordered
        column={1}
        size="middle"
        style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
        labelStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa', padding: '10px' }}
        contentStyle={{ padding: '10px', fontSize: '15px' }}
      >
        <Descriptions.Item label="Product Name">
          <Text strong>{product?.item_name}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          <Tag color="blue">{product?.category_id}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          <Tag icon={<DollarOutlined />} color="green">${product?.price}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Bar Code">
          <Tag icon={<BarcodeOutlined />}>{product?.barcode}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Stock">
          <Text>{product?.stock}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Minimum Expected Stock">
          <Text>{product?.minimum_stock}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Supplier Name">
          <Text>{product?.supplier_name}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          <Tag icon={<DollarOutlined />} color="green"><strong>${product?.price}</strong></Tag>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ProductDetailsModal;
