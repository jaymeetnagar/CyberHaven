const { render, screen, waitFor, fireEvent } = require('@testing-library/react');
const { BrowserRouter: Router, Route } = require('react-router-dom');
const axios = require('axios');
const ProductDetailPage = require('../Components/ProductDetailPage');

jest.mock('axios');

const product = {
  _id: '1',
  title: 'Sample Product',
  price: 10,
  imageURL: 'sample_image.jpg',
  category: 'SampleCategory',
  description: 'Sample description'
};

describe('ProductDetailPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { data: product } });
  });

  it('fetches and renders product details', async () => {
    render(
      <Router>
        <Route path="/product-details/:productId">
          <ProductDetailPage />
        </Route>
      </Router>
    );

    // Check if the product details are fetched and rendered correctly
    await waitFor(() => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`Category: ${product.category}`)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  it('calls handleAddToCart when "Add to Cart" button is clicked', async () => {
    const handleAddToCartMock = jest.fn();
    render(
      <Router>
        <Route path="/product-details/:productId">
          <ProductDetailPage />
        </Route>
      </Router>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add to Cart'));
      expect(handleAddToCartMock).toHaveBeenCalledTimes(1);
    });
  });
});
