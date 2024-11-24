import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/Product.entity';
import { CreateProductDto } from '../dtos/CreateProductDTO';
import { UpdateProductDto } from '../dtos/UpdateProductDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturersService } from './manufacturers.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private manufacturerService: ManufacturersService,
    private categoryService: CategoriesService,
  ) {}

  // async create(createProductDto: CreateProductDto): Promise<Product> {
  //   const newProduct = await this.productRepository.create(createProductDto);
  //   if (createProductDto.manufacturerId) {
  //     const manufacturer = await this.manufacturerService.findOne(
  //       createProductDto.manufacturerId,
  //     );
  //     newProduct.manufacturer = manufacturer;
  //   }
  //   return this.productRepository.save(newProduct);
  // }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { manufacturerId, categoriesIds } = createProductDto;

      // Validate manufacturer
      if (!manufacturerId) {
        throw new Error('The manufacturer is required.');
      }
      const manufacturer =
        await this.manufacturerService.findOne(manufacturerId);
      if (!manufacturer) {
        throw new Error(`Manufacturer with ID ${manufacturerId} not found.`);
      }

      // Validate categories
      if (!categoriesIds?.length) {
        throw new Error('At least one category must be assigned.');
      }
      const categories = await Promise.all(
        categoriesIds.map((id) => this.categoryService.findOne(id)),
      );
      if (categories.includes(undefined)) {
        throw new Error('Some categories were not found.');
      }

      // Create a new object with the processed values
      const productData = {
        ...createProductDto,
        manufacturerId: manufacturer.id,
        categoriesIds: categories.map((cat) => cat.id),
      };

      // Create and save the product
      const newProduct = this.productRepository.create(productData);
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.error('Error creating the product:', error.message);
      throw new Error(
        'There was an issue trying to create the product. Please try again.',
      );
    }
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['manufacturer', 'categories'],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['manufacturer', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // async update(
  //   id: number,
  //   updateProductDto: UpdateProductDto,
  // ): Promise<Product> {
  //   const product = await this.productRepository.findOne({ where: { id } });
  //   if (!product) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }

  //   const updatedProduct = this.productRepository.merge(
  //     product,
  //     updateProductDto,
  //   );
  //   return await this.productRepository.save(updatedProduct);
  // }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      // Buscar el producto existente por su ID
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Producto con id ${id} no encontrado.`);
      }

      if (updateProductDto.manufacturerId) {
        const manufacturer = await this.manufacturerService.findOne(
          updateProductDto.manufacturerId,
        );

        if (!manufacturer) {
          throw new NotFoundException(
            `No se encontró un fabricante con el ID ${updateProductDto.manufacturerId}.`,
          );
        }

        product.manufacturer = manufacturer;
      }

      const updatedProduct = this.productRepository.merge(
        product,
        updateProductDto,
      );

      // Guardar los cambios en la base de datos
      return await this.productRepository.save(updatedProduct);
    } catch (error) {
      // Loggear el error para depuración
      console.error('Error al actualizar el producto:', error.message);

      // Lanza una excepción genérica o personalizada
      throw new Error(
        'Hubo un problema al intentar actualizar el producto. Por favor, intente nuevamente.',
      );
    }
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.remove(product);
  }

  //realiza un borrado logico del producto
  async softDelete(id: number): Promise<void> {
    const productToRemove = await this.productRepository.findOne({
      where: { id },
    });
    if (!productToRemove) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.softRemove(productToRemove);
  }

  //devuelve todos los productos + los de borrado logico
  async findAllWithDeleted(): Promise<Product[]> {
    return await this.productRepository.find({ withDeleted: true });
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    try {
      // Buscar el producto con sus categorías
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['categories'],
      });

      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      const categoryExists = product.categories.some(
        (item) => item.id === categoryId,
      );

      if (!categoryExists) {
        throw new Error(
          `Category with ID ${categoryId} is not associated with product ID ${productId}.`,
        );
      }

      product.categories = product.categories.filter(
        (item) => item.id !== categoryId,
      );

      const updatedProduct = await this.productRepository.save(product);

      return {
        message: `Category with ID ${categoryId} removed from product ID ${productId}.`,
        product: updatedProduct,
      };
    } catch (error) {
      console.error('Error removing category from product:', error.message);

      throw new Error(
        'An error occurred while trying to remove the category from the product. Please try again.',
      );
    }
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    try {
      // Buscar el producto con sus categorías
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['categories'],
      });

      // Validar si el producto existe
      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      // Buscar la categoría
      const category = await this.categoryService.findOne(categoryId);

      if (!category) {
        throw new Error(`Category with ID ${categoryId} not found.`);
      }

      const isCategoryAlreadyAdded = product.categories.some(
        (item) => item.id === categoryId,
      );

      if (isCategoryAlreadyAdded) {
        throw new Error(
          `Category with ID ${categoryId} is already associated with product ID ${productId}.`,
        );
      }

      product.categories.push(category);

      const updatedProduct = await this.productRepository.save(product);

      return {
        message: `Category with ID ${categoryId} added to product ID ${productId}.`,
        product: updatedProduct,
      };
    } catch (error) {
      console.error('Error adding category to product:', error.message);

      throw new Error(
        'An error occurred while trying to add the category to the product. Please try again.',
      );
    }
  }

  async deleteCategoryFromProduct(productId: number, categoryId: number) {
    try {
      // Buscar el producto con sus categorías
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['categories'],
      });

      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      const categoryExists = product.categories.some(
        (item) => item.id === categoryId,
      );

      if (!categoryExists) {
        throw new Error(
          `Category with ID ${categoryId} is not associated with product ID ${productId}.`,
        );
      }

      product.categories = product.categories.filter(
        (item) => item.id !== categoryId,
      );

      const updatedProduct = await this.productRepository.save(product);

      return {
        message: `Category with ID ${categoryId} removed from product ID ${productId}.`,
        product: updatedProduct,
      };
    } catch (error) {
      console.error('Error removing category from product:', error.message);

      throw new Error(
        'An error occurred while trying to remove the category from the product. Please try again.',
      );
    }
  }
}
