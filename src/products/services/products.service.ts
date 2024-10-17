import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/Product.entity';
import { CreateProductDto } from '../dtos/CreateProductDTO';
// // import { CreateProductDto } from './dto/create-product.dto';
// // import { UpdateProductDto } from './dto/update-product.dto';
//
@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max',
      description: 'El smartphone más potente del mercado',
      price: 1299,
      stock: 20,
      made_in: 'China',
      image: 'iphone14promax.jpg',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23 Ultra',
      description: 'Un smartphone con una cámara increíble',
      price: 1199,
      stock: 15,
      made_in: 'Corea del Sur',
      image: 'galaxys23ultra.jpg',
    },
    {
      id: 3,
      name: 'PlayStation 5',
      description: 'La consola de nueva generación de Sony',
      price: 549,
      stock: 5,
      made_in: 'Japón',
      image: 'playstation5.jpg',
    },
    {
      id: 4,
      name: 'Nintendo Switch OLED',
      description: 'La consola híbrida de Nintendo',
      price: 349,
      stock: 30,
      made_in: 'Japón',
      image: 'nintendoswitcholed.jpg',
    },
    {
      id: 5,
      name: 'MacBook Pro 14',
      description: 'La portátil más potente de Apple',
      price: 1999,
      stock: 10,
      made_in: 'China',
      image: 'macbookpro14.jpg',
    },
    {
      id: 6,
      name: 'Smart TV Samsung 55 pulgadas',
      description: 'Una televisión 4K con una calidad de imagen excepcional',
      price: 899,
      stock: 25,
      made_in: 'Corea del Sur',
      image: 'samsungtv55.jpg',
    },
    {
      id: 7,
      name: 'Auriculares AirPods Pro 2',
      description: 'Los auriculares inalámbricos más vendidos',
      price: 249,
      stock: 40,
      made_in: 'China',
      image: 'airpodspro2.jpg',
    },
    {
      id: 8,
      name: 'Consola Xbox Series X',
      description: 'La consola de nueva generación de Microsoft',
      price: 499,
      stock: 12,
      made_in: 'Estados Unidos',
      image: 'xboxseriesx.jpg',
    },
    {
      id: 9,
      name: 'Smartwatch Apple Watch Series 8',
      description: 'El reloj inteligente más avanzado',
      price: 499,
      stock: 18,
      made_in: 'China',
      image: 'applewatchseries8.jpg',
    },
    {
      id: 10,
      name: 'Tablet Samsung Galaxy Tab S8',
      description: 'Una tablet potente y versátil',
      price: 699,
      stock: 22,
      made_in: 'Corea del Sur',
      image: 'galaxytabs8.jpg',
    },
  ];

  create(createProductDto: CreateProductDto): Product {
    const newProductId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;

    const newProduct: Product = {
      id: newProductId,
      ...createProductDto,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} is not found`);
    }
    return product;
  }

  update(id: number, payload: any): void {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex !== -1) {
      // Esta estrategia copia todos los valores de los atributos de un producto expecifico a
      // updatedProduct,lugo lo mismo para con payload,
      const updatedProduct = {
        ...this.products[productIndex],
        ...payload,
      };

      this.products.splice(productIndex, 1, updatedProduct);
    } else {
      console.warn(`Product with ID ${id} not found.`);
    }
  }
  //
  //   update(id: number, updateProductDto: UpdateProductDto) {
  //     return `This action updates a #${id} product`;
  //   }
  //
  remove(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    } else {
      throw new NotFoundException(
        `Product with ID ${id} not found in the array`,
      );
    }
  }
}
