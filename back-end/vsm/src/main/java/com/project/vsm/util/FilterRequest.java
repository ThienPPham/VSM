package com.project.vsm.util;

import com.project.vsm.dto.request.PagingRequest;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

@Data
public abstract class FilterRequest <T>{
    private PagingRequest paging = new PagingRequest();
    public abstract Specification<T> specification();
}
