import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto, ProductsResponseDto } from './dto/product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Operations with Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    description: 'List of all products',
  })
  @Get()
  async findAll(): Promise<ProductsResponseDto> {
    return this.productsService.findAll();
  }

  @ApiOperation({
    description: 'Get product by ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    if (isNaN(+id)) {
      throw new BadRequestException("Parameter 'Id' should be a number");
    }
    return this.productsService.findOne(+id);
  }
}
