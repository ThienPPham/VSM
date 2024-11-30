package com.project.vsm.service;

import java.time.LocalDate;
import java.util.*;

import com.project.vsm.dto.response.RouteResponse;
import com.project.vsm.model.ScheduleEntity;
import com.project.vsm.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.RouteCreateDTO;
import com.project.vsm.exception.InvalidInputException;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.RouteEntity;
import com.project.vsm.repository.RouteRepository;

@Service
public class RouteService {

	@Autowired
	private RouteRepository routeRepository;

	@Autowired
	private ScheduleRepository scheduleRepository;

	public Iterable<RouteEntity> getAllRoutes() {
		Iterable<RouteEntity> listRoutes = routeRepository.findAll();
		return listRoutes;
	}

	public RouteEntity createNewRoute(RouteCreateDTO routeInput) {
		RouteEntity newRoute = new RouteEntity();
		newRoute.setStartLocation(routeInput.getStartLocation());
		newRoute.setStopLocation(routeInput.getStopLocation());
		if (routeInput.getStartLocation().equalsIgnoreCase(routeInput.getStopLocation())) {
			throw new InvalidInputException("Điểm bắt đầu và kết thúc phải khác nhau");
		}
		if (routeRepository.existsByStartLocationAndStopLocation(routeInput.getStartLocation(),
				routeInput.getStopLocation())) {
			throw new InvalidInputException(
					"Đã tồn tại tuyến đường với " + routeInput.getStartLocation() + ">" + routeInput.getStopLocation());
		}
		return routeRepository.save(newRoute);
	}

	public RouteEntity updateRoute(long id, RouteCreateDTO routeInput) {
		Optional<RouteEntity> optionalRoute = routeRepository.findById(id);
		if (!optionalRoute.isPresent()) {
			throw new NotFoundException("Not found route with id " + id);
		}
		if (routeRepository.existsByStartLocationAndStopLocation(routeInput.getStartLocation(),
				routeInput.getStopLocation())) {
			throw new InvalidInputException(
					"Đã tồn tại tuyến đường với " + routeInput.getStartLocation() + ">" + routeInput.getStopLocation());
		}
		if (routeInput.getStartLocation().equalsIgnoreCase(routeInput.getStopLocation())) {
			throw new InvalidInputException("Điểm bắt đầu và kết thúc phải khác nhau");
		}
		optionalRoute.get().setStartLocation(routeInput.getStartLocation());
		optionalRoute.get().setStopLocation(routeInput.getStopLocation());
		return routeRepository.save(optionalRoute.get());
	}

	public RouteEntity deteleRouteById(long id) {
		Optional<RouteEntity> optionalRoute = routeRepository.findById(id);
		if (!optionalRoute.isPresent()) {
			throw new NotFoundException("Not found route with id " + id);
		}
		routeRepository.delete(optionalRoute.get());
		return optionalRoute.get();
	}
	public List<RouteResponse> getRouteWithSchedule(long scheduleId, long routeId, String startLocation,
													String stopLocation, LocalDate startTime) {
		List<RouteEntity> routes = routeRepository.findStartLocationStopLocationStartTime(
				scheduleId, routeId, startLocation, stopLocation, startTime);

		if (routes.isEmpty()) {
			System.out.println("No schedules found.");
			return Collections.emptyList();
		}

		List<RouteResponse> responses = new ArrayList<>();
		for (RouteEntity route : routes) {
			List<ScheduleEntity> schedules = scheduleRepository.findByRouteIdAndStartTime(route.getId(), startTime);
			RouteResponse response = RouteResponse.mapRouteResponse(route, schedules);
			responses.add(response);
		}
		return responses;
	}

}