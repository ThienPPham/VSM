import React, { useState } from "react";
import styles from "pages/bookingTicket.module.css";
import BookingForm from "components/BookingForm";

const Seat = ({ seatId, seatStatus, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSeatClick = () => {
    if (seatStatus === "sold") return;
    setIsSelected((prev) => !prev);
    onSelect(seatId, !isSelected);
  };

  return (
    <td
      className={`${styles.avseat} ${
        seatStatus === "sold" ? styles.soldSeat : ""
      }`}
      onClick={handleSeatClick}
      data-seat-id={seatId}
      title={seatId}
    >
      <div
        className={`avicon ${
          seatStatus === "sold"
            ? "icon-seat-sold"
            : isSelected
            ? "icon-seat-selected"
            : "icon-seat-empty"
        }`}
      />
      <span className={styles.showSeatId}>{seatId}</span>
    </td>
  );
};

const Schedule10Seat = () => {
  const ticketPrice = 150000;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toggle, setToggle] = useState(false);

  const handleSeatSelection = (seatId, isSelected) => {
    setSelectedSeats((prev) => {
      if (isSelected) {
        return [...prev, seatId];
      } else {
        return prev.filter((id) => id !== seatId);
      }
    });

    setTotalPrice((prev) =>
      isSelected ? prev + ticketPrice : prev - ticketPrice
    );
  };

  const handelClickDetail = () => {
    setToggle(!toggle);
  };
  return (
    <div
      className={`${styles.bookingPage__tickets__item} ${styles.allowBook}`}
      data-wrap-trip="PLT0Tc1ybgN295oCg20241015"
      id="tripPLT0Tc1ybgN295oCg20241015"
    >
      <div className={styles.bookingPage__tickets__item__thumb}>
        <div className={styles.bookingPage__tickets__item__thumb__time}>
          <div className={styles.times}>
            <h3>19 : 00</h3>
          </div>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__route}>
          <span className="avicon icon-bus" />
          <div className={styles.route}>
            <h3 className={styles.showAsRoute}>
              Đồng Hới - Quảng Nam (24P Vip)
            </h3>
          </div>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__seat}>
          <span className="avicon icon-chair" />
          <div className={styles.seat}>
            <h3>
              <b
                data-content="totalEmptySeat"
                data-seat-empty={14}
                data-trip-id="PLT0Tc1ybgN295oCg20241015"
                data-seatmap-id="SM0Tc1ybgBNa7yys"
              >
                14
              </b>{" "}
              chỗ trống
            </h3>
            <span>Giường nằm limousine</span>
          </div>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__price}>
          <span> 150,000</span>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__view_button}>
          <a
            // className="js--toggleCreateMap"
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            href="#collapse--booking-ticketPLT0Tc1ybgN295oCg20241015"
            data-parent="#tripPLT0Tc1ybgN295oCg20241015"
            // data-toggle="collapse"
            onClick={handelClickDetail}
          >
            Chọn chỗ
          </a>
        </div>
      </div>
      {toggle === true ? (
        <div className={styles.bookingPage__tickets__item__collapse} style={{transition : "all 0.5s ease"}}>
          <div
            className={
              styles.bookingPage__tickets__item__collapse__list_point__wrap
            }
            collapse
            data-parent="#tripPLT0Tc1ybgN295oCg20241015"
            id="collapse--list-routePLT0Tc1ybgN295oCg20241015"
          >
            <span className="avicon icon-caret-top" />
          </div>
          <div
            className={styles.bookingPage__tickets__item__collapse__booking}
            collapse
            data-parent="#tripPLT0Tc1ybgN295oCg20241015"
            id="collapse--booking-ticketPLT0Tc1ybgN295oCg20241015"
          >
            <div
              className={
                styles.bookingPage__tickets__item__collapse__booking__seat_map
              }
            >
              <div
                className={
                  styles.bookingPage__tickets__item__collapse__booking__seat_map__floor
                }
              >
                <h4>Xe 10 chỗ</h4>
                <table le="" className={styles.avseatmap}>
                  <tbody>
                    <tr>
                      <td
                        className={styles.avseat}
                        data-seat-price={0}
                        data-extra-price={0}
                        data-trip-id="PLT0Tc1ybgN295oCg20241015"
                        data-seat-status="notSell"
                        data-seat-col={1}
                        data-seat-row={1}
                        data-seat-type={2}
                        data-seat-floor={1}
                        data-seat-id="TAI"
                        title="TAI"
                        data-seatmap-id="SM0Tc1ybgBNa7yys"
                      >
                        <div className="avicon icon-seat-not-sell" />
                        <span className={styles.showSeatId}>TAI</span>
                      </td>
                      <td />
                      <Seat
                        seatId="A1"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A2"
                        seatStatus="sold"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A3"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A4"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A5"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A6"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A7"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A8"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                      <td />

                      <Seat
                        seatId="A9"
                        seatStatus="available"
                        onSelect={handleSeatSelection}
                      />
                     
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className={
                  styles.bookingPage__tickets__item__collapse__booking__seat_map__note
                }
              >
                <p>
                  <span className="avicon icon-seat-empty" />
                  Ghế trống
                </p>
                <p>
                  <span className="avicon icon-seat-booked" />
                  Ghế đã đặt
                </p>
                <p>
                  <span className="avicon icon-seat-selected" />
                  Ghế đang chọn
                </p>
                <p>
                  <span className="avicon icon-seat-sold" />
                  Ghế đã bán
                </p>
                <p>
                  <span className="avicon icon-seat-not-sell" />
                  Ghế không bán
                </p>
              </div>
            </div>
            <BookingForm
              selectedSeats={selectedSeats}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Schedule10Seat;
