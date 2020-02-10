describe('order.js', () => {
  let order;
  let pizzaMock;

  beforeEach(() => {
    order = new Order();
  });

  beforeEach(() => {
    pizzaMock = {};
  });

  describe('pizzas', () => {
    it('should to be defined', () => {
      expect(order.pizzas).toBeDefined();
    });
  });

  describe('totalPrice()', () => {
    it('should throw an error when pizzaPrice is 0', () => {
      order.addPizza({pizzaPrice: 0});
      expect(() => order.totalPrice()).toThrow();
      expect(() => order.totalPrice()).toThrowError(Error);
      expect(() => order.totalPrice()).toThrowError(Error, 'Pizza can\'t cost 0 USD');
    });

    it('should throw an error when pizzaPrice is undefined', () => {
      order.addPizza(pizzaMock);
      expect(() => order.totalPrice()).toThrow();
      expect(() => order.totalPrice()).toThrowError(Error);
      expect(() => order.totalPrice()).toThrowError(Error, 'Pizza must have a price');
    });

    it('should return totalPrice', () => {
      order.addPizza({pizzaPrice: 1});
      order.addPizza({pizzaPrice: 2});
      expect(order.totalPrice).toBe(3);
    });
  });

  describe('addPizza()', () => {
    it('should add pizza to pizzas and pizzas length should be greater than 0', () => {
      order.addPizza(pizzaMock);
      expect(order.pizzas.length).toBeGreaterThan(0);
    });

    it('should add value to pizzas', () => {
      const pizzasSpy = spyOn(order, 'addPizza').and.returnValue(1);
      expect(order.addPizza(pizzaMock)).toBe(1);
    });
  });

  describe('removePizza()', () => {
    it('should remove pizza from pizzas and index of the deleted item should return -1', () => {
      order.addPizza(pizzaMock);
      order.removePizza(pizzaMock);
      expect(order.pizzas.indexOf(pizzaMock)).toBe(-1);
    });
  });
});
