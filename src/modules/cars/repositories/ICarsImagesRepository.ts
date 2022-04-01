import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create(car_id, image_name): Promise<CarImage>;
}

export { ICarsImagesRepository };
