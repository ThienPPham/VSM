package com.project.vsm.dto.response;

import com.project.vsm.model.TypeEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TypeResponse {
     long typeId;
     int numSeat;
     long price;
}
