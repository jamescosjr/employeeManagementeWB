import { 
  createEmployeeService,
  updateEmployeeService,
  deleteEmployeeService,
  getAllEmployeesService,
  getByIdService,
  getByPositionService,
  getByDepartmentService,
  getBySalaryService,
  getByNameService
} from "../../domain/services/employeeService.js";
import { AppError, ValidationError, NotFoundError } from "../../domain/error/customErros.js";
import { validateEmployee } from "../../domain/utils/validation.js";

export async function createEmployeeHandler(req, res, next) {
  const { name, position, department, salary } = req.body;

  const validation = validateEmployee(name, position, department, salary);

  if(!validation.valid){
      return next(new ValidationError(validation.message));
  }

  try{
      const result = await createEmployeeService({ name, position, department, salary });
      res.status(201).json(result);
  } catch (error) {
      next(error);
  }
}

export async function updateEmployeeHandler(req, res, next) {
  const { id } = req.params;
  const { name, position, department, salary } = req.body;

  const validation = validateEmployee(name, position, department, salary);

  if(!validation.valid){
      return next(new ValidationError(validation.message));
  }

  try{
      const result = await updateEmployeeService(id, { name, position, department, salary });
      if(!result){
          return next(new NotFoundError('employee not found'));
      }
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}

export async function deleteEmployeeHandler(req, res, next) {
  const { id } = req.params;

  try{
      const result = await deleteEmployeeService(id);
      if(!result){
          return next(new NotFoundError('employee not found'));
      }
      res.status(204).end();
  } catch (error) {
      next(error);
  }
}

export async function getEmployeesHandler(req, res, next) {
  try{
      const result = await getAllEmployeesService();
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}

export async function getEmployeeByIdHandler(req, res, next) {
  const { id } = req.params;

  try{
      const result = await getByIdService(id);
      if(!result){
          return next(new NotFoundError('employee not found'));
      }
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}

export async function getEmployeesByNameHandler(req, res, next) {
  const { name } = req.params;

  try{
      const result = await getByNameService(name);

      if(!result){
          return next(new NotFoundError('employee not found'));
      }

      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}

export async function getEmployeesByPositionHandler(req, res, next) {
  const { position } = req.params;

  try{
      const result = await getByPositionService(position);

      if(!result){
          return next(new NotFoundError('employee not found'));
      }

      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}

export async function getEmployeesByDepartmentHandler(req, res, next) {
  const { department } = req.params;

  try{
      const result = await getByDepartmentService(department);

      if(!result){
          return next(new NotFoundError('employee not found'));
      }

      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}

export async function getEmployeesBySalaryHandler(req, res, next) {
  const { salary } = req.params;

  try{
      const result = await getBySalaryService(salary);

      if(!result){
          return next(new NotFoundError('employee not found'));
      }

      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}