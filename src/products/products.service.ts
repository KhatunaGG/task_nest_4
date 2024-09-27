import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProductsService {
  constructor(private usersService: UsersService) {}
  private products = [
    { type: 'bread', price: 1.5, discount: 0.9, id: 1 },
    { type: 'butter', price: 5, discount: 4, id: 2 },
    { type: 'tea', price: 1.5, discount: 0, id: 3 },
    { type: 'coffee', price: 1.5, discount: 0, id: 4 },
    { type: 'milk', price: 1.5, discount: 0.9, id: 5 },
  ];

  create(createProductDto: CreateProductDto) {
    if (
      !createProductDto.discount ||
      !createProductDto.price ||
      !createProductDto.type
    )
      throw new HttpException(
        'Type, Price and Discount are required',
        HttpStatus.BAD_REQUEST,
      );
    const lastId = this.products[this.products.length - 1]?.id || 1;
    const newProduct = {
      id: lastId + 1,
      ...createProductDto,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(userId: number) {
    const user = this.usersService.findOne(userId);

    const dateNow = new Date();
    const subscriptionEndDate = new Date(user.subscriptionEnd);
    const hasActiveSubscription = subscriptionEndDate.getTime() > dateNow.getTime();
  
    if (hasActiveSubscription) {
      return this.products;
    }

    const notDiscountedProducts = this.products.filter(
      (product) => product.discount === 0
    );

    return notDiscountedProducts;
  }



  findOne(id: number) {
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    const existingProduct = this.products.find((el) => el.id === id);
    if (!existingProduct)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    return existingProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    if (
      !id ||
      !updateProductDto.discount ||
      !updateProductDto.price ||
      !updateProductDto.type
    )
      throw new HttpException(
        'Type, Price and Discount are required',
        HttpStatus.BAD_REQUEST,
      );
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const updatedProduct = {
      ...this.products[index],
      ...updateProductDto,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  remove(id: number) {
    if (!id) throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }
}
