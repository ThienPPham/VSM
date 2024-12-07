package com.project.vsm.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ticket")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class TicketEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ticket_id")
	long ticketId;

	@Column(name = "price")
	double price;

	@Column(name = "payment_method")
	String paymentMethod;

	@Column(name = "is_paid")
	boolean isPaid;

	@Column(name = "start_location")
	String startLocation;

	@Column(name = "stop_location")
	String stopLocation;

	@Column(name = "status")
	String status;

	@Column(name = "qr_payment")
	String QRPayment;

	@Column(name = "selected_seat")
	String selectedSeat;

	@Column(name = "note")
	String note;

	@Column(name = "email")
	String email;

	@Column(name = "fullname")
	String fullName;

	@Column(name = "phone_number")
	String phoneNumber;

	@Column(name = "detail_address_pick_up")
	String detailAddressPickUp;

	@Column(name = "detail_address_drop_off")
	String detailAddressDropOff;

	@OneToOne(cascade = { CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH })
	@JoinColumn(name = "voucher_id")
	VoucherEntity voucher;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "payment_id")
	PaymentEntity paymentEntity;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "account_id")
	AccountEntity account;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "schedule_id")
	ScheduleEntity scheduleEntity;

	@Override
	public String toString() {
		return "TicketEntity [ticketId=" + ticketId + ", price=" + price + ", paymentMethod=" + paymentMethod
				+ ", isPaid=" + isPaid + ", startLocation=" + startLocation + ", stopLocation=" + stopLocation
				+ ", status=" + status + ", QRPayment=" + QRPayment + ", selectedSeat=" + selectedSeat + ", note="
				+ note + ", email=" + email + ", fullName=" + fullName + ", phoneNumber=" + phoneNumber
				+ ", detailAddressPickUp=" + detailAddressPickUp + ", detailAddressDropOff=" + detailAddressDropOff
				+ ", voucher=" + voucher + ", paymentEntity=" + paymentEntity + ", account=" + account
				+ ", scheduleEntity=" + scheduleEntity + "]";
	}
}
