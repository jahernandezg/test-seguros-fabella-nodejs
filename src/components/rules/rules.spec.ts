import * as RuleService from "./rules.service";

describe('rules', () => {
  it('findAll should return all rules', async() => {
    expect(await RuleService.findAll()).toEqual(RuleService.rules)
  });
  
  it('find by KEY should return rule key AUMENTAR_PRICE_SUPER_DUPER', async() => {
    expect(await RuleService.find('AUMENTAR_PRICE_SUPER_DUPER')).toEqual(RuleService.rules['AUMENTAR_PRICE_SUPER_DUPER'])
  });

  it('find by KEY NO_EXISTE_RULE  Throw error No record found', async() => {
    expect( RuleService.find('NO_EXISTE_RULE')).rejects.toEqual(new Error('No record found'));
  });

})
