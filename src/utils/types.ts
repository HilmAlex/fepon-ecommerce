interface slugProductProps {
  _type: string;
  current: string;
}

export interface imageProductProps {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

export interface productProps {
  name: string;
  title: string;
  description: string;
  price: number;
  slug: slugProductProps;
  image: imageProductProps;
  brand: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export interface dataProps {
  products?: productProps[];
  error?: string;
  loading: boolean;
}

export interface productScreenProps {
  product?: productProps;
  error?: string;
  loading: boolean;
}
