import React, { useEffect, useState } from "react";
import styles from "pages/bookingTicket.module.css";
import BookingForm from "components/BookingForm";
import { root } from "helper/axiosClient";

const Seat = ({ seatId, onSelect, bookedSeats }) => {
  const status = bookedSeats[seatId];
  const [isSelected, setIsSelected] = useState(false);

  const handleSeatClick = () => {
    if (status === "Đã thanh toán" || status === "Đang chờ xử lý") return;
    setIsSelected((prev) => !prev);
    onSelect(seatId, !isSelected);
  };

  const getSeatIcon = () => {
    if (isSelected) return "icon-seat-selected"; 
    if (status === "Đang chờ xử lý") return "icon-seat-booked";
    if (status === "Đã thanh toán") return "icon-seat-sold";
    if (status === "Hủy đặt vé") return "icon-seat-empty";
    return "icon-seat-empty";
  };

  return (
    <td
      className={styles.avseat}
      onClick={handleSeatClick}
      data-seat-id={seatId}
      title={seatId}
    >
      <div className={`avicon ${getSeatIcon()}`} />
      <span className={styles.showSeatId}>{seatId}</span>
    </td>
  );
};

const Schedule7Seat = ({
  startTime,
  startLocation,
  stopLocation,
  car,
  numSeat,
  price,
  scheduleId,
  typeId,
}) => {
  const ticketPrice = price;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [bookedSeats, setBookedSeats] = useState({
    soldSeats: [],
    bookedSeats: [],
  });

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

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await root.get(
          `/public/ticket-with-schedule/${scheduleId}`
        );

        const seatStatusMap = response.data.reduce((acc, ticket) => {
          acc[ticket.selectedSeat] = ticket.status; 
          return acc;
        }, {});

        setBookedSeats(seatStatusMap);
        console.log("««««« response.data »»»»»", response.data);
      } catch (err) {
        console.log("««««« err »»»»»", err);
      }
    };

    fetchBookedSeats();
  }, [scheduleId]);
  return (
    <div
      className={`${styles.bookingPage__tickets__item} ${styles.allowBook}`}
      data-wrap-trip="PLT0Tc1ybgN295oCg20241015"
      id="tripPLT0Tc1ybgN295oCg20241015"
    >
      <div className={styles.bookingPage__tickets__item__thumb}>
        <div className={styles.bookingPage__tickets__item__thumb__time}>
          <span className="avicon icon-clock"></span>
          <h3 className={styles.times}>
            {new Date(startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h3>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__route}>
          <span className="avicon icon-bus" style={{ marginRight: "14px" }} />
          <div className={styles.route}>
            <h3 className={styles.showAsRoute}>
              {startLocation} - {stopLocation}
            </h3>
          </div>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__seat}>
          <span className="avicon icon-chair" style={{ marginRight: "14px" }} />
          <div className={styles.seat}>
            <h3>
              <b
                data-content="totalEmptySeat"
                data-seat-empty={14}
                data-trip-id="PLT0Tc1ybgN295oCg20241015"
                data-seatmap-id="SM0Tc1ybgBNa7yys"
              >
                {numSeat}
              </b>{" "}
              chỗ ngồi
            </h3>
            <span>Xe {car.name}</span>
          </div>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__price}>
          <span>{price.toLocaleString()} VND</span>
        </div>
        <div className={styles.bookingPage__tickets__item__thumb__view_button}>
          <a
            data-trip-id="PLT0Tc1ybgN295oCg20241015"
            href="#"
            data-parent="#tripPLT0Tc1ybgN295oCg20241015"
            data-toggle="collapse"
            onClick={handelClickDetail}
          >
            Chọn chỗ
          </a>
        </div>
      </div>
      {toggle === true ? (
        <div
          className={styles.bookingPage__tickets__item__collapse}
          style={{ transition: "all 0.5s ease" }}
        >
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
                <h4>Xe 7 chỗ</h4>
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
                        // seatStatus="available"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A2"
                        // seatStatus="sold"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A3"
                        // seatStatus="available"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A4"
                        // seatStatus="available"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                    </tr>
                    <tr>
                      <Seat
                        seatId="A5"
                        // seatStatus="available"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A6"
                        // seatStatus="available"
                        bookedSeats={bookedSeats}
                        onSelect={handleSeatSelection}
                      />
                      <Seat
                        seatId="A7"
                        // seatStatus="available"
                        bookedSeats={bookedSeats}
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
              startTime={startTime}
              startLocation={startLocation}
              stopLocation={stopLocation}
              car={car}
              numSeat={numSeat}
              price={price}
              scheduleId={scheduleId}
              typeId={typeId}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Schedule7Seat;
