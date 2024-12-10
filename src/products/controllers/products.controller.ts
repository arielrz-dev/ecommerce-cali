import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../dtos/UpdateProductDTO';
import { CreateProductDto } from '../dtos/CreateProductDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { FilterProductDto } from '../entities/Product.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

// @UseGuards(AuthGuard('jwt'))
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get one product by ID' })
  @Get('/:id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  getAllProducts(@Query() params?: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @ApiOperation({ summary: 'Update a product' })
  @Put('/:id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
