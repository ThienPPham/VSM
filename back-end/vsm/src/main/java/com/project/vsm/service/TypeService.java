package com.project.vsm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.vsm.dto.TypeDTO;
import com.project.vsm.exception.NotFoundException;
import com.project.vsm.model.TypeEntity;
import com.project.vsm.repository.DetailSeatRepository;
import com.project.vsm.repository.TypeRepository;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TypeService {
	@Autowired
	private TypeRepository typeRepository;
	@Autowired
	private DetailSeatRepository detailSeatRepository;

	public Optional<TypeEntity> getTypeById(long id) {
		Optional<TypeEntity> optionalType = typeRepository.findById(id);
		if (!optionalType.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}
		return optionalType;
	}

	@Transactional
	public void deleteTypeById(long id) {
		detailSeatRepository.deleteByTypeEntityId(id);
		typeRepository.deleteById(id);
	}

	public TypeEntity createNewType(TypeDTO type) {
		TypeEntity newType = new TypeEntity();
		newType.setNumSeats(type.getNumSeat());
		newType.setTypeName(type.getName());
		return typeRepository.save(newType);
	}

	public Iterable<TypeEntity> getAllTypes() {
		Iterable<TypeEntity> listTypeEntities = typeRepository.findAll();
		return listTypeEntities;
	}

	public TypeEntity updateTypeById(long id, TypeDTO typeInput) {
		Optional<TypeEntity> optionalEntity = typeRepository.findById(id);
		if (!optionalEntity.isPresent()) {
			throw new NotFoundException("Not found type with id " + id);
		}
		optionalEntity.get().setNumSeats(typeInput.getNumSeat());
		optionalEntity.get().setTypeName(typeInput.getName());
		return typeRepository.save(optionalEntity.get());
	}

}