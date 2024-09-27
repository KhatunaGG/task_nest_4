import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductGuard } from './productsGuards/products.guard';
import { UserSubscription } from './productsGuards/userSubscription.guard';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(ProductGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }



  @Get()
  @UseGuards(UserSubscription)
  findAll(@Req() request) {
    return this.productsService.findAll(Number(request.userId));
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(ProductGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }


  @Delete(':id')
  @UseGuards(ProductGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
