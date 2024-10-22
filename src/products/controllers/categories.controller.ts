import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { UpdateCategoryDto } from '../dtos/UpdateCategoryDTO';
import { CreateCategoryDto } from '../dtos/CreateCategoryDTO';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.findAll();
  }

  // @Get()
  // getCategories(
  //   @Query('brand') brand = '',
  //   @Query('offset') offset = 0,
  //   @Query('limit') limit = 100,
  // ) {
  //   return this.categoriesService.findAll();
  // }

  @Get(':idCategory')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('idCategory', ParseIntPipe) idCategory: number) {
    return this.categoriesService.findOne(idCategory);
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put('/:id')
  updateCategory(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete('/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    this.categoriesService.remove(id);
  }
}
