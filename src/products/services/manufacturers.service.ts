import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateManufacturerDto } from '../dtos/UpdateManufacturerDto';
import { Manufacturer } from '../entities/manufacturer.entity';

@Injectable()
export class ManufacturersService {
  manufacturers = [
    {
      id: 1,
      name: 'Apple Inc.',
      address: '1 Apple Park Way, Cupertino, CA, USA',
      email: 'support@apple.com',
      image: 'https://example.com/images/apple.png',
    },
    {
      id: 2,
      name: 'Samsung Electronics',
      address: '129 Samsung-ro, Yeongtong-gu, Suwon-si, South Korea',
      email: 'support@samsung.com',
      image: 'https://example.com/images/samsung.png',
    },
    {
      id: 3,
      name: 'Sony Interactive Entertainment',
      address: '1-7-1 Konan, Minato-ku, Tokyo, Japan',
      email: 'support@sony.com',
      image: 'https://example.com/images/sony.png',
    },
    {
      id: 4,
      name: 'Nintendo Co., Ltd.',
      address: '11-1 Kamitoba-hokotate-cho, Minami-ku, Kyoto, Japan',
      email: 'support@nintendo.com',
      image: 'https://example.com/images/nintendo.png',
    },
    {
      id: 5,
      name: 'Microsoft Corporation',
      address: 'One Microsoft Way, Redmond, WA, USA',
      email: 'support@microsoft.com',
      image: 'https://example.com/images/microsoft.png',
    },
  ];

  create(CreateManufacturersDto: CreateManufacturersDto): Manufacturer {
    const newManufacturerId = this.manufacturers.length
      ? Math.max(...this.manufacturers.map((p) => p.id)) + 1
      : 1;

    const newManufacturer: Manufacturer = {
      id: newManufacturerId,
      ...CreateManufacturersDto,
    };

    this.manufacturers.push(newManufacturer);
    return newManufacturer;
  }

  findAll() {
    return this.manufacturers;
  }

  findOne(id: number): Manufacturer {
    const Manufacturer = this.manufacturers.find((item) => item.id === id);
    if (!Manufacturer) {
      throw new NotFoundException(`Manufacturer with id ${id} is not found`);
    }
    return Manufacturer;
  }

  update(id: number, payload: UpdateManufacturerDto): void {
    const manufacturerIndex = this.manufacturers.findIndex(
      (Manufacturer) => Manufacturer.id === id,
    );

    if (manufacturerIndex !== -1) {
      // Esta estrategia copia todos los valores de los atributos de un Manufacturero expecifico a
      // updatedManufacturer,lugo lo mismo para con payload,
      const updatedManufacturer = {
        ...this.manufacturers[manufacturerIndex],
        ...payload,
      };

      this.manufacturers.splice(manufacturerIndex, 1, updatedManufacturer);
    } else {
      console.warn(`Manufacturer with ID ${id} not found.`);
    }
  }
  //
  //   update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
  //     return `This action updates a #${id} Manufacturer`;
  //   }
  //
  remove(id: number) {
    const index = this.manufacturers.findIndex(
      (manufacturer) => manufacturer.id === id,
    );
    if (index !== -1) {
      this.manufacturers.splice(index, 1);
      return true;
    } else {
      throw new NotFoundException(
        `Manufacturer with ID ${id} not found in the array`,
      );
    }
  }
}
