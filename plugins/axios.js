export default function ({ $axios, $swal }) {

  $axios.onRequest(config => {
    alert(JSON.stringify(config))
  }),
        $axios.onResponse((response) => {
            if (response.status === 299) $swal({ title: "...אופס", text: response.data, icon: "error", rtl: true });
            else if (response.status !== 298) $swal({ title: "הפעולה בוצעה בהצלחה", icon: "success", toast: true, timer: 5000, timerProgressBar: true, position: 'top-end', showConfirmButton: false, rtl: true });
        })
}
