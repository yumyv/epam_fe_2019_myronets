describe('pizza.js', () => {
  let toppingsMock;
  let sizeMock;

  beforeEach(() => {
    toppingsMock = [];
    sizeMock = '';
  });


  describe('pizzaPrice()', () => {
    it('should throw an error when pizza without size', () => {
      const pizza = new Pizza(toppingsMock, sizeMock);
      expect(() => pizza.pizzaPrice()).toThrow();
      expect(() => pizza.pizzaPrice()).toThrowError(Error);
      expect(() => pizza.pizzaPrice()).toThrowError(Error, 'Size can\'t find');
    });

    it('should return multiplying pizza size by toppingsPrice', () => {
      const pizza = new Pizza(['corn', 'mushrooms'], 'small');
      const sum = toppings.corn + toppings.mushrooms;
      expect(pizza.pizzaPrice).toBe(sum * size[pizza.size]);
    });
  });

  describe('toppingsPrice()', () => {
    it('should throw an error when toppings don\'t find', () => {
      const pizza = new Pizza(toppingsMock);
      expect(() => pizza.toppingsPrice()).toThrow();
      expect(() => pizza.toppingsPrice()).toThrowError(Error);
      expect(() => pizza.toppingsPrice()).toThrowError(Error, 'Toppings can\'t find');
    });

    it('should throw an error when topping don\'t find', () => {
      const pizza = new Pizza(['some'], sizeMock);
      expect(() => pizza.toppingsPrice()).toThrow();
      expect(() => pizza.toppingsPrice()).toThrowError(Error);
      expect(() => pizza.toppingsPrice()).toThrowError(Error, 'Topping bla can\'t fin');
    });

    it('should return correct pizza toppings sum', () => {
      const pizza = new Pizza(['corn', 'mushrooms'], sizeMock);
      const sum = toppings.corn + toppings.mushrooms;
      expect(pizza.toppingsPrice).toBe(sum);
    });
  });

  describe('constructor', () => {
    it('toppings should be defined', () => {
      const pizza = new Pizza('corn');
      expect(pizza.toppings).toBeDefined();
      expect(pizza.toppings).toEqual('corn');
    });

    it('size should be defined', () => {
      const pizza = new Pizza(toppingsMock, 'small');
      expect(pizza.size).toBeDefined();
      expect(pizza.size).toEqual('small');
    });
  });
});
