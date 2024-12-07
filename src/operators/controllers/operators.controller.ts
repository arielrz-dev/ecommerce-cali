import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperatorsService } from '../services/operators.service';
import { CreateOperatorDto } from '../dtos/CreateOperatorDTO';
import { UpdateOperatorDto } from '../dtos/UpdateOperatorDTO';

@ApiTags('Operators')
@Controller('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @ApiOperation({ summary: 'Get all operators' })
  @Get()
  getAllOperators() {
    return this.operatorsService.findAll();
  }

  @ApiOperation({ summary: 'Get an operator by ID' })
  @Get(':idOperator')
  @HttpCode(HttpStatus.ACCEPTED)
  getOperator(@Param('idOperator', ParseIntPipe) idOperator: string) {
    return this.operatorsService.findOne(idOperator);
  }

  @ApiOperation({ summary: 'Create a new operator' })
  @Post()
  createOperator(@Body() payload: CreateOperatorDto) {
    return this.operatorsService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing operator' })
  @Put('/:id')
  updateOperator(@Param('id') id: string, @Body() payload: UpdateOperatorDto) {
    return this.operatorsService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an operator by ID' })
  @Delete('/:id')
  deleteOperator(@Param('id', ParseIntPipe) id: string) {
    return this.operatorsService.remove(id);
  }
}
