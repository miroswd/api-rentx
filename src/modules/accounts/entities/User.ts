import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  avatar: string;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    // url de aceso do avatar
    switch (process.env.DISK) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
        break;

      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
        break;
      default:
        return null;
        break;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
