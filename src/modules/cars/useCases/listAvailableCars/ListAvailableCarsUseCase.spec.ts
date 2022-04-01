import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car 1",
      brand: "car brand",
      description: "car description",
      category_id: "category_id",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-3121",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car 2",
      brand: "car brand2",
      description: "car description",
      category_id: "category_id",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-4322",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "car 2" });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car 3",
      brand: "car brand3",
      description: "car description",
      category_id: "category_id",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-4332",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car brand3",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car 3",
      brand: "car brand3",
      description: "car description",
      category_id: "123456",
      daily_rate: 140,
      fine_amount: 100,
      license_plate: "ABC-4332",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456",
    });
    expect(cars).toEqual([car]);
  });
});
