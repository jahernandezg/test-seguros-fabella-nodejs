import * as ProductService from "./products.service";

describe('products', () => {
  it('findAll should return all products', async() => {
    expect(await ProductService.findAll()).toEqual(ProductService.products)
  });
  
  it('find by ID should return product ID 2', async() => {
    expect(await ProductService.find(2)).toEqual(ProductService.products[2])
  });

  it('find by ID 5165165 should Throw error not found resource', async() => {
    expect( ProductService.find(5165165)).rejects.toEqual(new Error('No record found'));
  });

  it('create Product', async() => {

    const newProduct = {
      "id": expect.any(new Date().valueOf()),
      "name": "Mega cobertura 3",
      "sellIn": 15,
      "price": 80,
      "rules": [
        "DISMINUIR_SELLIN"
      ]
    }
    expect(await ProductService.create(newProduct)).toEqual(newProduct);
  });

  it('update Product', async() => {

    const updateProduct = {
      id: 4,
      name: "Mega cobertura 2",
      sellIn: 15,
      price: 80,
      rules: ['DISMINUIR_SELLIN']
  }
    expect(await ProductService.update(updateProduct)).toEqual(updateProduct);
  });

  it('update Product ID 5165165 should Throw error No record found to update', async() => {
    const updateProduct = {
      id: 5165165,
      name: "Mega cobertura 2",
      sellIn: 15,
      price: 80,
      rules: ['DISMINUIR_SELLIN']
  }
    expect( ProductService.update(updateProduct)).rejects.toEqual(new Error('No record found to update'));
  });


  it('Delete Product by ID 3', async() => {
    expect(await ProductService.remove(3)).toEqual('OK');
  });

  it('Delete Product by ID 32432432423 Throw error No record found to delete', async() => {
    expect( ProductService.remove(32432432423)).rejects.toEqual(new Error('No record found to delete'));
  });


  it('evaluateProducts with param 5 days', async() => {
    const testProduct = await ProductService.find(1);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 10;
    expectProduct.price = 15;
    const evaluateProducts = await ProductService.evaluateProducts(5);
    const dayTest = evaluateProducts[4];
    const reduceTest = dayTest.arrProducts[0];
    expect(reduceTest).toMatchObject(expectProduct);
  });

  it('evaluateProducts negative value days', () => {
    expect( ProductService.evaluateProducts(-1)).rejects.toEqual(new Error('Days parameter must be greater than 0'));
  });

  it('applyRules test Conditions DISMINUIR_PRICE', async() => {
    const testProduct = await ProductService.find(1);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 0;
    expectProduct.price = 15;

    const reduceTest = JSON.parse(JSON.stringify(expectProduct));

    reduceTest.sellIn = -1;
    reduceTest.price = 13;

    expect(await ProductService.applyRules(expectProduct)).toMatchObject(reduceTest);
  });

  it('applyRules test Conditions AUMENTAR_PRICE_SUPER_DUPER sellIn <=5', async() => {
    const testProduct = await ProductService.find(5);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 5;
    expectProduct.price = 20;

    const reduceTest = JSON.parse(JSON.stringify(expectProduct));

    reduceTest.sellIn = 4;
    reduceTest.price = 23;

    expect(await ProductService.applyRules(expectProduct)).toMatchObject(reduceTest);
  });

  it('applyRules test Conditions AUMENTAR_PRICE_SUPER_DUPER sellIn <=0', async() => {
    const testProduct = await ProductService.find(5);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 0;
    expectProduct.price = 20;

    const reduceTest = JSON.parse(JSON.stringify(expectProduct));

    reduceTest.sellIn = -1;
    reduceTest.price = 0;

    expect(await ProductService.applyRules(expectProduct)).toMatchObject(reduceTest);
  });

  it('applyRules test Conditions DISMINUIR_PRICE_X2', async() => {
    const testProduct = await ProductService.find(6);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 0;
    expectProduct.price = 20;

    const reduceTest = JSON.parse(JSON.stringify(expectProduct));

    reduceTest.sellIn = -1;
    reduceTest.price = 16;
    expect(await ProductService.applyRules(expectProduct)).toMatchObject(reduceTest);
  });



  it('applyRules test Conditions price <= 0', async() => {
    const testProduct = await ProductService.find(5);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 0;
    expectProduct.price = -10;

    const reduceTest = JSON.parse(JSON.stringify(expectProduct));

    reduceTest.sellIn = -1;
    reduceTest.price = 0;

    expect(await ProductService.applyRules(expectProduct)).toMatchObject(reduceTest);
  });

  it('applyRules test Conditions price > 100', async() => {
    const testProduct = await ProductService.find(5);
    const expectProduct = JSON.parse(JSON.stringify(testProduct));
    expectProduct.sellIn = 10;
    expectProduct.price = 110;

    const reduceTest = JSON.parse(JSON.stringify(expectProduct));

    reduceTest.sellIn = 9;
    reduceTest.price = 100;

    expect(await ProductService.applyRules(expectProduct)).toMatchObject(reduceTest);
  });


})
