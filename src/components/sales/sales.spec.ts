import * as SaleService from "./sales.service";
import moment from "moment";

describe('sales', () => {
  it('findAll should return all sales', async() => {
    expect(await SaleService.findAll()).toEqual(SaleService.sales)
  });

  
  it('find by ID should return Sales ID 2', async() => {

    const expectSale =  {
      "id": 1585176820238,
      "products": [
        {
          "id": 4,
          "name": "Mega cobertura",
          "sellIn": 15,
          "price": 80,
          "rules": [
            "DISMINUIR_SELLIN"
          ]
        }
      ],
      "createdAt": moment('2020-03-25T22:53:40.238Z').toDate()
    }

    expect(await SaleService.find(1585176820238)).toEqual(expectSale)
  });

  it('Find Throw Error not found resource', async() => {
    // expect(await SaleService.find(342343243242344)).toThrowError();
    expect(SaleService.find(342343243242344)).rejects.toEqual(new Error('No record found'))
  });

  it('create Sale', async() => {

    const expectSale =  {
      "id": expect.any(new Date().valueOf()),
      "products": [
        {
          "id": 4,
          "name": "Mega cobertura",
          "sellIn": 15,
          "price": 80,
          "rules": [
            "DISMINUIR_SELLIN"
          ]
        }
      ],
      "createdAt": moment('2020-03-25T22:53:40.238Z').toDate()
    };

    expect(await SaleService.create(expectSale)).toMatchObject(expectSale);
  });

  it('Create Throw Error bad product structure', async() => {
    const expectSale =  {
      "id": expect.any(new Date().valueOf()),
      "products": [],
      "createdAt": moment('2020-03-25T22:53:40.238Z').toDate()
    };
    expect( SaleService.create(expectSale)).rejects.toEqual(new Error('The sale must contain products'));
  });

  it('get Sold Products ', async() => {

    const expectSale =  {
      "id": expect.any(new Date().valueOf()),
      "products": [
        {
          "id": 4,
          "name": "Mega cobertura",
          "sellIn": 15,
          "price": 80,
          "rules": [
            "DISMINUIR_SELLIN"
          ]
        }
      ],
      "createdAt": moment('2020-03-25T22:53:40.238Z').toDate()
    };
    const soldProducts = await SaleService.soldProducts();
    expect(Array.isArray(soldProducts)).toBe(true);
  });


})
