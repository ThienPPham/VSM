package com.project.vsm.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.ScheduleCreateDTO;
import com.project.vsm.dto.ScheduleUpdateDTO;
import com.project.vsm.dto.response.ScheduleResponse;
import com.project.vsm.model.AccountEntity;
import com.project.vsm.model.CarEntity;
import com.project.vsm.model.CarRouteEntity;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.repository.AccountRepository;
import com.project.vsm.repository.CarRepository;
import com.project.vsm.repository.CarRouteRepository;
import com.project.vsm.repository.RouteRepository;
import com.project.vsm.repository.ScheduleRepository;

@Service
public class ScheduleService {
	@Autowired
	private ScheduleRepository scheduleRepository;

	@Autowired
	private CarRepository carRepository;

	@Autowired
	private RouteRepository routeRepository;

	@Autowired
	private CarRouteRepository carRouteRepository;
	@Autowired
	private AccountRepository accountRepository;

	/**
	 * Tìm hoặc tạo mới một lịch trình dựa trên carId, routeId, và thời gian khởi
	 * hành.
	 *
	 * @param carId         ID của xe.
	 * @param routeId       ID của tuyến đường.
	 * @param userStartTime Thời gian khởi hành do người dùng cung cấp.
	 * @return Lịch trình tìm thấy hoặc được tạo mới.
	 */
	public ScheduleResponse createOrFindSchedule(ScheduleCreateDTO scheduleCreateDTO) {
		// Bước 1: Tìm CarEntity, RouteEntity và AccountEntity
		CarEntity car = carRepository.findById(scheduleCreateDTO.getCarId()).orElseThrow(
				() -> new IllegalArgumentException("Không tìm thấy xe với ID: " + scheduleCreateDTO.getCarId()));

		RouteEntity route = routeRepository.findById(scheduleCreateDTO.getRouteId())
				.orElseThrow(() -> new IllegalArgumentException(
						"Không tìm thấy tuyến đường với ID: " + scheduleCreateDTO.getRouteId()));

		// Bước 2: Tìm CarRouteEntity phù hợp
		CarRouteEntity carRoute = carRouteRepository.findByCarAndRoute(car, route);
		if (carRoute == null) {
			throw new IllegalArgumentException("Không tìm thấy tuyến đường áp dụng cho xe đã chọn.");
		}

		// Bước 3: Xác định khoảng thời gian ghép
		LocalDateTime userStartTime = scheduleCreateDTO.getStartTime();
		LocalDateTime minTime = userStartTime.minusMinutes(carRoute.getTime()); // Sử dụng thời gian từ CarRouteEntity
		LocalDateTime maxTime = userStartTime.plusMinutes(carRoute.getTime());

		// Bước 4: Kiểm tra xem đã tồn tại lịch trình nào phù hợp với điều kiện
		List<ScheduleEntity> existingSchedules = scheduleRepository.findScheduleByCarRouteAndTimeRange(carRoute,
				minTime, maxTime);

		if (!existingSchedules.isEmpty()) {
			// Nếu có lịch trình với emptySeat > 0, trả về lịch trình đầu tiên
			return convertToScheduleResponse(existingSchedules.get(0)); // Hoặc logic khác tùy vào yêu cầu
		}

		// Bước 5: Nếu không có lịch trình phù hợp hoặc tất cả emptySeat = 0, tạo mới
		// lịch trình
		ScheduleEntity newSchedule = new ScheduleEntity();
		newSchedule.setCarRoute(carRoute);
		newSchedule.setStartTime(userStartTime);
		newSchedule.setEndTime(null); // Có thể tính toán thời gian kết thúc nếu cần
		newSchedule.setStatus("Đã lên lịch");

		// Lấy số ghế từ TypeEntity
		TypeEntity type = carRoute.getCar().getType();
		if (type != null) {
			newSchedule.setEmptySeat(type.getNumSeats());
		} else {
			throw new IllegalArgumentException("Không tìm thấy thông tin loại xe.");
		}
		scheduleRepository.save(newSchedule);
		return convertToScheduleResponse(newSchedule); // Trả về lịch trình mới
	}

	private ScheduleResponse convertToScheduleResponse(ScheduleEntity entity) {
		ScheduleResponse response = new ScheduleResponse();
		response.setId(entity.getId());
		response.setStartTime(entity.getStartTime());
		response.setEndTime(entity.getEndTime());
		response.setStatus(entity.getStatus());
		response.setEmptySeat(entity.getEmptySeat());
		// Lấy thông tin từ CarRouteEntity
		CarRouteEntity carRoute = entity.getCarRoute();
		if (carRoute != null) {
			response.setPrice(carRoute.getPrice());

			// Lấy thông tin RouteEntity
			RouteEntity route = carRoute.getRoute();
			if (route != null) {
				response.setIdRoute(route.getId());
				response.setStartLocation(route.getStartLocation());
				response.setStopLocation(route.getStopLocation());
			}

			// Lấy thông tin CarEntity
			CarEntity car = carRoute.getCar();
			if (car != null) {
				response.setIdCar(car.getCarId());
				response.setNameCar(car.getName());
				response.setPlateNumber(car.getPlateNumber());

				// Lấy thông tin TypeEntity
				TypeEntity type = car.getType();
				if (type != null) {
					response.setIdType(type.getId());
					response.setTypeCarName(type.getTypeName());
					response.setNumSeats(type.getNumSeats());
				}
			}
		}

		// Lấy thông tin AccountEntity (tài xế)
		AccountEntity account = entity.getAccount();
		if (account != null) {
			response.setIdDriver(account.getId());
			response.setFirstNameDriver(account.getFirstName());
			response.setLastNameDriver(account.getLastName());
			response.setPhoneNumberDriver(account.getPhoneNumber());
		}

		return response;
	}

	public List<ScheduleResponse> getAllSchedules() {
		List<ScheduleEntity> scheduleEntities = scheduleRepository.findAll();
		return scheduleEntities.stream().map(this::convertToScheduleResponse).collect(Collectors.toList());
	}

	public ScheduleResponse getScheduleById(Long id) {
		ScheduleEntity entity = scheduleRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch trình với ID: " + id));
		return convertToScheduleResponse(entity);
	}

	public void deleteScheduleById(Long id) {
		ScheduleEntity schedule = scheduleRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch trình với ID: " + id));
		scheduleRepository.delete(schedule);
	}

	public ScheduleResponse updateSchedule(Long id, ScheduleUpdateDTO scheduleUpdateDTO) {
		// Tìm lịch trình cần cập nhật
		ScheduleEntity schedule = scheduleRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lịch trình với ID: " + id));
//		// Cập nhật tuyến đường (CarRoute)
//		CarRouteEntity carRoute = carRouteRepository.findById(scheduleUpdateDTO.getCarRouteId())
//				.orElseThrow(() -> new IllegalArgumentException(
//						"Không tìm thấy tuyến đường với ID: " + scheduleUpdateDTO.getCarRouteId()));

		// Cập nhật tài khoản (Account)
		AccountEntity account = accountRepository.findById(scheduleUpdateDTO.getAccountId())
				.orElseThrow(() -> new IllegalArgumentException(
						"Không tìm thấy tài khoản với ID: " + scheduleUpdateDTO.getAccountId()));
		// Cập nhật thông tin khác
//		schedule.setCarRoute(carRoute);
		schedule.setAccount(account);
		schedule.setStatus(scheduleUpdateDTO.getStatus());
		// Lưu thay đổi vào cơ sở dữ liệu
		ScheduleEntity updatedSchedule = scheduleRepository.save(schedule);
		// Chuyển đổi sang ScheduleResponse và trả về
		return convertToScheduleResponse(updatedSchedule);
	}
}