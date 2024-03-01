export interface ITotal {
  _sum: {
    price: number;
    price_discount: number;
    price_amount: number;
  };
  _count: {
    id: number;
  };
  _max: {
    price: number;
  };
  _min: {
    price: number;
  };
  _avg: {
    price: number;
  };
}
