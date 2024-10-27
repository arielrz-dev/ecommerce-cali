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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  getAllCategories() {
    return this.categoriesService.findAll();
  }

  @Get(':idCategory')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Get a category by ID' })
  getCategory(@Param('idCategory', ParseIntPipe) idCategory: number) {
    return this.categoriesService.findOne(idCategory);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing category' })
  updateCategory(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    this.categoriesService.remove(id);
  }
}
